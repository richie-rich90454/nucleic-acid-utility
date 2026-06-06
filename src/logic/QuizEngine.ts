import {CodonTable} from "./CodonTable";

export type QuizMode="codon-to-amino"|"amino-to-codon"|"mixed";

export interface QuizQuestion{
    question: string;
    options: string[];
    correctIndex: number;
    codon: string;
    aminoAcid: string;
}

export interface QuizStats{
    total: number;
    correct: number;
    streak: number;
    bestStreak: number;
}

interface CodonPerformance{
    correct: number;
    wrong: number;
}

export class QuizEngine{
    private codonTable: CodonTable;
    private stats: QuizStats;
    private performance: Map<string, CodonPerformance>;
    private allCodons: string[];
    private allAminoAcids: string[];

    constructor(codonTable: CodonTable){
        this.codonTable=codonTable;
        this.stats={total: 0, correct: 0, streak: 0, bestStreak: 0};
        this.performance=new Map();
        this.allCodons=Object.keys(codonTable.codonTable);
        this.allAminoAcids=[...new Set(Object.values(codonTable.codonTable))];
    }

    generateQuestion(mode: QuizMode): QuizQuestion{
        if (mode=="mixed"){
            mode=Math.random()<0.5?"codon-to-amino":"amino-to-codon";
        }
        if (mode=="codon-to-amino"){
            return this.generateCodonToAmino();
        }
        return this.generateAminoToCodon();
    }

    generateBatch(mode: QuizMode, count: number): QuizQuestion[]{
        let questions: QuizQuestion[]=[];
        let usedCodons=new Set<string>();
        let available=[...this.allCodons];
        for (let i=0;i<count;i++){
            let question: QuizQuestion;
            if (available.length>0){
                let idx=Math.floor(Math.random()*available.length);
                let codon=available[idx];
                available.splice(idx, 1);
                question=this.generateQuestionForCodon(codon, mode);
            }
            else{
                question=this.generateQuestion(mode);
            }
            questions.push(question);
        }
        return questions;
    }

    checkAnswer(question: QuizQuestion, selectedIndex: number): boolean{
        let isCorrect=selectedIndex===question.correctIndex;
        this.stats.total++;
        if (isCorrect){
            this.stats.correct++;
            this.stats.streak++;
            if (this.stats.streak>this.stats.bestStreak){
                this.stats.bestStreak=this.stats.streak;
            }
        }
        else{
            this.stats.streak=0;
        }
        let perf=this.performance.get(question.codon)||{correct: 0, wrong: 0};
        if (isCorrect){
            perf.correct++;
        }
        else{
            perf.wrong++;
        }
        this.performance.set(question.codon, perf);
        return isCorrect;
    }

    getStats(): QuizStats{
        return{...this.stats};
    }

    resetStats(): void{
        this.stats={total: 0, correct: 0, streak: 0, bestStreak: 0};
        this.performance.clear();
    }

    getWeakCodons(): string[]{
        let weak: {codon: string; ratio: number}[]=[];
        for (let [codon, perf] of this.performance){
            if (perf.wrong>0){
                let ratio=perf.wrong/(perf.correct+perf.wrong);
                weak.push({codon, ratio});
            }
        }
        weak.sort((a, b)=>b.ratio-a.ratio);
        return weak.map(w=>w.codon);
    }

    private generateQuestionForCodon(codon: string, mode: QuizMode): QuizQuestion{
        if (mode=="mixed"){
            mode=Math.random()<0.5?"codon-to-amino":"amino-to-codon";
        }
        if (mode=="codon-to-amino"){
            return this.buildCodonToAminoQuestion(codon);
        }
        return this.buildAminoToCodonQuestion(codon);
    }

    private generateCodonToAmino(): QuizQuestion{
        let codon=this.allCodons[Math.floor(Math.random()*this.allCodons.length)];
        return this.buildCodonToAminoQuestion(codon);
    }

    private generateAminoToCodon(): QuizQuestion{
        let codon=this.allCodons[Math.floor(Math.random()*this.allCodons.length)];
        return this.buildAminoToCodonQuestion(codon);
    }

    private buildCodonToAminoQuestion(codon: string): QuizQuestion{
        let correctAmino=this.codonTable.codonTable[codon];
        let wrongOptions=this.pickRandom(this.allAminoAcids.filter(a=>a!==correctAmino), 3);
        let options=this.shuffle([correctAmino, ...wrongOptions]);
        return{
            question: `What amino acid does ${codon} code for?`,
            options,
            correctIndex: options.indexOf(correctAmino),
            codon,
            aminoAcid: correctAmino
        };
    }

    private buildAminoToCodonQuestion(codon: string): QuizQuestion{
        let correctAmino=this.codonTable.codonTable[codon];
        let wrongCodons=this.allCodons.filter(c=>
            c!==codon&&this.codonTable.codonTable[c]!==correctAmino
        );
        let wrongOptions=this.pickRandom(wrongCodons, 3);
        let options=this.shuffle([codon, ...wrongOptions]);
        return{
            question: `Which codon codes for ${correctAmino}?`,
            options,
            correctIndex: options.indexOf(codon),
            codon,
            aminoAcid: correctAmino
        };
    }

    private pickRandom<T>(arr: T[], count: number): T[]{
        let copy=[...arr];
        let result: T[]=[];
        for (let i=0;i<count&&copy.length>0;i++){
            let idx=Math.floor(Math.random()*copy.length);
            result.push(copy[idx]);
            copy.splice(idx, 1);
        }
        return result;
    }

    private shuffle<T>(arr: T[]): T[]{
        let copy=[...arr];
        for (let i=copy.length-1;i>0;i--){
            let j=Math.floor(Math.random()*(i+1));
            [copy[i], copy[j]]=[copy[j], copy[i]];
        }
        return copy;
    }
}

export namespace entitys {
	
	export class Encounter {
	    id: number;
	    match_id: number;
	    winner_id: number;
	    loser_id: number;
	
	    static createFrom(source: any = {}) {
	        return new Encounter(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.match_id = source["match_id"];
	        this.winner_id = source["winner_id"];
	        this.loser_id = source["loser_id"];
	    }
	}
	export class Player {
	    id: string;
	    name: string;
	    email: string;
	    password: string;
	    janodolares: number;
	
	    static createFrom(source: any = {}) {
	        return new Player(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.email = source["email"];
	        this.password = source["password"];
	        this.janodolares = source["janodolares"];
	    }
	}
	export class Match {
	    id: string;
	    round_id: string;
	    number_of_encounters: number;
	    player1: Player;
	    player2: Player;
	    player1_score: number;
	    player2_score: number;
	    encounters?: Encounter[];
	
	    static createFrom(source: any = {}) {
	        return new Match(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.round_id = source["round_id"];
	        this.number_of_encounters = source["number_of_encounters"];
	        this.player1 = this.convertValues(source["player1"], Player);
	        this.player2 = this.convertValues(source["player2"], Player);
	        this.player1_score = source["player1_score"];
	        this.player2_score = source["player2_score"];
	        this.encounters = this.convertValues(source["encounters"], Encounter);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	export class Round {
	    id: string;
	    tournament_id: string;
	    round_number: number;
	    matches?: Match[];
	
	    static createFrom(source: any = {}) {
	        return new Round(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.tournament_id = source["tournament_id"];
	        this.round_number = source["round_number"];
	        this.matches = this.convertValues(source["matches"], Match);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Tournament_Direct_Elimination {
	    id?: string;
	    name: string;
	    players?: Player[];
	    rounds?: Round[];
	    playThirdPlace?: boolean;
	    currentRound: number;
	    isEnded: boolean;
	
	    static createFrom(source: any = {}) {
	        return new Tournament_Direct_Elimination(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.players = this.convertValues(source["players"], Player);
	        this.rounds = this.convertValues(source["rounds"], Round);
	        this.playThirdPlace = source["playThirdPlace"];
	        this.currentRound = source["currentRound"];
	        this.isEnded = source["isEnded"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}


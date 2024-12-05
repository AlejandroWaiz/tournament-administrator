export namespace entitys {
	
	export class Player {
	    name: string;
	    email: string;
	    password: string;
	    janodolares: number;
	
	    static createFrom(source: any = {}) {
	        return new Player(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.email = source["email"];
	        this.password = source["password"];
	        this.janodolares = source["janodolares"];
	    }
	}
	export class Encounter {
	    participants: Player[];
	    encounterWinner: Player;
	    encounterLoser: Player;
	
	    static createFrom(source: any = {}) {
	        return new Encounter(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.participants = this.convertValues(source["participants"], Player);
	        this.encounterWinner = this.convertValues(source["encounterWinner"], Player);
	        this.encounterLoser = this.convertValues(source["encounterLoser"], Player);
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
	export class Match {
	    encounters: Encounter[];
	    numberOfEncounters: number;
	    players: Player[];
	    matchWinner: Player;
	    matchLoser: Player;
	
	    static createFrom(source: any = {}) {
	        return new Match(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.encounters = this.convertValues(source["encounters"], Encounter);
	        this.numberOfEncounters = source["numberOfEncounters"];
	        this.players = this.convertValues(source["players"], Player);
	        this.matchWinner = this.convertValues(source["matchWinner"], Player);
	        this.matchLoser = this.convertValues(source["matchLoser"], Player);
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
	export class Tournament {
	    name: string;
	    players: Player[];
	    rounds: Match[][];
	    allMatchs: Match[];
	    numberOfRounds: number;
	
	    static createFrom(source: any = {}) {
	        return new Tournament(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.players = this.convertValues(source["players"], Player);
	        this.rounds = this.convertValues(source["rounds"], Match);
	        this.allMatchs = this.convertValues(source["allMatchs"], Match);
	        this.numberOfRounds = source["numberOfRounds"];
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


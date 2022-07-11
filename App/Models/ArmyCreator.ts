export class Army {
	constructor() {
		this.Divisions = [];
		this.DivisionIds = [];
	}
	public ArmyId: number;
	public ArmyName: string;
	public ArmyNotes: string;
	public EraTemplateId: number;
	public DivisionIds?: number[] = [];
	public Divisions?: Division[] = [];
}

export class ArmyVM {
	public ArmyId: number;
	public ArmyName: string;
	public ArmyNotes: string;
	public DivisionCount: number;
}

export class Division {
	public DivisionId: number;
	public DivisionName: string;
	public ArmyId: number;
	public UnitIds?: number[] = [];
	public Units?: Unit[] = [];
	public Commander?: Commander;
}

export class Unit {
	UnitId: number;
	DivisionId: number;
	UnitName: string;
	UnitNotes: string;
	ArmamentId: number;
	UnitTypeId: number;
	Melee: number;
	Shooting: string;
	Morale: number;
	Stamina: number;
	SpecialRuleIds: number[] = [];
	SpecialRules: SpecialRule[] = [];
	Order: number;
}


export class EraTemplate {
	constructor() {
		this.UnitTemplateIds = [];
		this.UnitTemplates = [];
	}
	TemplateId: number;
	TemplateName: string;
	TemplateNotes: string;
	Order: number;
	UnitTemplateIds?: number[] = [];
	UnitTemplates?: UnitTemplate[] = [];
}

export class UnitTemplate {
	constructor() {
		this.SpecialRuleIds = [];
		this.SpecialRules = [];
	}
	UnitTemplateId: number;
	UnitName: string;
	UnitNotes?: string = "";
	ArmamentId: number;
	UnitTypeId: number;
	Melee: number;
	Shooting: string;
	Morale: number;
	Stamina: number;
	SpecialRuleIds?: number[] = [];
	SpecialRules?: SpecialRule[] = [];
	Order: number;
}



export class Armament {
	ArmamentId: number;
	ArmamentName: string;
	Range: number;
	Order: number;
}
export class UnitType {
	UnitTypeId: number;
	UnitTypeName: string;
	Movement: number;
	Order: number;
}

export class SpecialRule {
	SpecialRuleId: number;
	SpecialRuleName: string;
	SpecialRuleDescription1: string;
	SpecialRuleDescription2: string;
	IsGlobal: boolean; // for rules that are common across all units in an army. These will not appear in a unit stat
IsCustom: boolean;
}


export class Commander {
	public CommanderId: number;
	public ArmyId: number;
	public CommanderFirstName: string;
	public CommanderSurname: string;
	public CommanderRank: string;
	public TraitIds: [] = [];

}

export class Trait {
	TraitId: number;
	TraitName: string;
	TraitDescription: string;
}

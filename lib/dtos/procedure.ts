export interface ProcedureView {
	id: number;
	quantity: number;
	notes: string;
	petId: number;
	medicineId: number;
	veterinaryId: number;
}

export interface ProcedureUpsert {
	quantity: number;
	notes: string;
	petId: number;
	medicineId: number;
	veterinaryId: number;
}

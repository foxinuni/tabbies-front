export interface ProcedureView {
	id: number;
	quantity: number;
	notes: string;
	petId: number;
	medicineId: number;
	veterinaryId: number;
}

export interface ProcedureUpsert {
    notes: string;
    quantity: number;
    medicineId: number | null;
    veterinaryId: number | null;
    petId: number;
  }

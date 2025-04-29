export interface MedicineView {
	id: number;
	name: string;
	buyPrice: number;
	sellPrice: number;
	stock: number;
	sold: number;
}

export interface MedicineUpsert {
	name: string;
	buyPrice: number;
	sellPrice: number;
	stock: number;
	sold: number;
}

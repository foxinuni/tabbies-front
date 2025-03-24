import Medicine from "./medicine";
import Pet from "./pet";
import Veterinary from "./veterinary";

export default interface Procedure {
    id: number;
    notes: string
    medicine_quantity: number;
    pet: Pet;
    medicine: Medicine;
    veterinarian: Veterinary;
}

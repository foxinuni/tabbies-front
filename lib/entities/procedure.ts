import Medicine from "./medicine";
import Pet from "./pet";
import Veterinary from "./veterinary";

export default interface Procedure {
    id: number;
    quantity: number;
    notes: string
    pet: Pet;
    medicine: Medicine;
    veterinarian: Veterinary;
}

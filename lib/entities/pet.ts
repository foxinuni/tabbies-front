import Disease from "./disease";
import User from "./user";

export default interface Pet {
    id: number;
    name: string;
    breed: string;
    weight: number;
    picture: string;
    birthDate: Date;
    disabled: boolean;
    owner?: User;
    disease?: Disease;
}

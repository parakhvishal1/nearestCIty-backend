import { IsNotEmpty } from "class-validator"

 
export class AddCityDto {
   
    @IsNotEmpty()
    readonly city: string
}
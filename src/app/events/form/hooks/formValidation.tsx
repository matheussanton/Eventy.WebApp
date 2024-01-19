import { parseDateFromString } from "@/utils/datetimeUtils";
import { EventForm } from "../types";

export const validateDates = (event: React.FormEvent<HTMLFormElement>) : string => {

    const data = new FormData(event.currentTarget);
    var startDate = data.get('startDate')?.toString() ?? "";
    var endDate = data.get('endDate')?.toString() ?? "";

    if(!startDate || !endDate) return "As datas são obrigatórias.";

    try {
        
        let startDateString = parseDateFromString(startDate);
        let endDateString = parseDateFromString(endDate);

        return "";
    } catch (error) {
        return "Datas inválidas."
    }
}

export const validate = (payload : EventForm, stateSetters : any) : boolean => {

    var isNameValid = validateName(payload?.name, stateSetters);
    var isDescriptionValid = validateDescription(payload?.description, stateSetters);

    if(!isNameValid || !isDescriptionValid){
        stateSetters.setShowError(true);
        return false;
      };
  
      return true;

};

const validateName = (name : any, stateSetters : any) : boolean => {
    
    if(!name || name.length == 0) {
        stateSetters.setNameValidationMessage("Nome é obrigatório");
        return false;
    }
    
    stateSetters.setNameValidationMessage("");
    return true;
}

const validateDescription = (description : any, stateSetters : any) : boolean => {
    
    if(!description || description.length == 0) {
        stateSetters.setDescriptionValidationMessage("Descrição é obrigatória");
        return false;
    }
    
    stateSetters.setDescriptionValidationMessage("");
    return true;
}

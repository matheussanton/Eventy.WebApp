import { User } from "../page";
import { EventForm } from "../types";

export const getFormData = (event: React.FormEvent<HTMLFormElement>, participants:  User[]) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    let startDate = new Date(data.get('startDate')?.toString() ?? "");
    startDate.setHours(startDate.getHours() - 3);

    let endDate = new Date(data.get('endDate')?.toString() ?? "");
    endDate.setHours(endDate.getHours() - 3);

    var payload : EventForm = {
      name: data.get('name')?.toString() ?? "",
      description: data.get('description')?.toString() ?? "",
      startDate: startDate.toISOString(),
      endDate:endDate.toISOString(),
      location: data.get('location')?.toString() ?? "",
      googleMapsUrl: data.get('googleMapsUrl')?.toString() ?? "",
      participants: participants.map((participant : any) => participant.id)
    }

    return payload;
}

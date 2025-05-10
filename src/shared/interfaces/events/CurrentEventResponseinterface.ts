export interface CurrentEventResponseInterface {
    ok: boolean;
    data: EventDataInterface;
    message?: string;
    status?: number;
}

export interface EventsResponseInterface {
    ok: boolean;
    data: EventDataInterface[];
    message?: string;
    status?: number;
}

export interface EventDataInterface {
    id: number;
    name: string;
    description: string;
    startDate: string; 
    endDate: string;   
    active: boolean;
}
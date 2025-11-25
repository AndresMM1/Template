export type ChangeStatus = "Aprobado" | "Pendiente" | "Rechazado" | "En Progreso";
export type ChangeImpact = "Alto" | "Medio" | "Bajo";
export type ChangeCategory = "NOCAB" | "Standard" | "Normal" | "Emergency";

export interface Change {
    id: string;
    jiraId: string; // e.g., "NXG-1212"
    jiraUrl: string; // URL to Jira ticket
    name: string;
    description: string;
    status: ChangeStatus;
    team: string;
    service: string;
    owner: string;
    socialized: boolean;
    location: string;
    homologation: boolean;
    impact: ChangeImpact;
    category: ChangeCategory;
    dueDate: string; // ISO Date string
}

export interface User {
    name: string;
    email: string;
}

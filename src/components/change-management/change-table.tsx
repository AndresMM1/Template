"use client";

import { Change, ChangeImpact, ChangeStatus } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import {
    CheckCircle2,
    Clock,
    XCircle,
    AlertTriangle,
    AlertCircle,
    Info,
    ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ChangeTableProps {
    changes: Change[];
}

const statusMap: Record<ChangeStatus, { icon: React.ElementType; className: string; badgeClassName: string }> = {
    "Aprobado": { icon: CheckCircle2, className: "text-green-600", badgeClassName: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300" },
    "Pendiente": { icon: Clock, className: "text-yellow-600", badgeClassName: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300" },
    "Rechazado": { icon: XCircle, className: "text-red-600", badgeClassName: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300" },
    "En Progreso": { icon: Clock, className: "text-blue-600", badgeClassName: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300" },
};

const impactMap: Record<ChangeImpact, { icon: React.ElementType; className: string; badgeClassName: string }> = {
    "Alto": { icon: AlertTriangle, className: "text-red-500", badgeClassName: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300" },
    "Medio": { icon: AlertCircle, className: "text-orange-500", badgeClassName: "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300" },
    "Bajo": { icon: Info, className: "text-blue-500", badgeClassName: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300" },
};

export function ChangeTable({ changes }: ChangeTableProps) {
    return (
        <div className="mt-4 rounded-md border">
            <Table>
                <TableHeader className="bg-muted/50">
                    <TableRow>
                        <TableHead className="font-semibold">ID</TableHead>
                        <TableHead className="font-semibold">Estado</TableHead>
                        <TableHead className="font-semibold">Equipo</TableHead>
                        <TableHead className="font-semibold">Servicio</TableHead>
                        <TableHead className="font-semibold">Dueño</TableHead>
                        <TableHead className="font-semibold text-center">Socializado</TableHead>
                        <TableHead className="font-semibold">Localización</TableHead>
                        <TableHead className="font-semibold text-center">Homologación</TableHead>
                        <TableHead className="font-semibold">Impacto</TableHead>
                        <TableHead className="font-semibold">Categoría</TableHead>
                        <TableHead className="font-semibold">Vencimiento</TableHead>
                        <TableHead className="font-semibold text-center">Jira</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {changes.length > 0 ? (
                        changes.map((change) => {
                            const StatusIcon = statusMap[change.status].icon;
                            const statusClassName = statusMap[change.status].className;
                            const statusBadgeClassName = statusMap[change.status].badgeClassName;

                            const ImpactIcon = impactMap[change.impact].icon;
                            const impactClassName = impactMap[change.impact].className;
                            const impactBadgeClassName = impactMap[change.impact].badgeClassName;

                            return (
                                <TableRow key={change.id} className="hover:bg-muted/50">
                                    <TableCell className="font-bold text-primary">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger className="text-left">
                                                    {change.jiraId}
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p className="font-semibold">{change.name}</p>
                                                    <p className="text-sm">{change.description}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={cn("border-0 font-medium", statusBadgeClassName)}>
                                            <div className="flex items-center gap-2">
                                                <StatusIcon className={cn("h-3.5 w-3.5", statusClassName)} />
                                                <span>{change.status}</span>
                                            </div>
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{change.team}</TableCell>
                                    <TableCell>{change.service}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="text-sm">{change.owner}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {change.socialized ? (
                                            <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">SI</Badge>
                                        ) : (
                                            <Badge variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-100">NO</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>{change.location}</TableCell>
                                    <TableCell className="text-center">
                                        {change.homologation ? (
                                            <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">SI</Badge>
                                        ) : (
                                            <Badge variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-100">NO</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={cn("border-0 font-medium", impactBadgeClassName)}>
                                            <div className="flex items-center gap-2">
                                                <ImpactIcon className={cn("h-3.5 w-3.5", impactClassName)} />
                                                <span>{change.impact}</span>
                                            </div>
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{change.category}</TableCell>
                                    <TableCell>
                                        {new Date(change.dueDate).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <a
                                                        href={change.jiraUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center justify-center rounded-md p-2 hover:bg-primary/10 transition-colors"
                                                    >
                                                        <ExternalLink className="h-4 w-4 text-primary" />
                                                    </a>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Abrir en Jira</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan={12} className="h-24 text-center">
                                No se encontraron cambios.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

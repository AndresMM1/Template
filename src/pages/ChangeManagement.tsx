import { useState, useMemo } from "react";
import { Change, ChangeStatus, ChangeImpact, ChangeCategory } from "@/lib/types";
import { ChangeTable } from "@/components/change-management/change-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Search, FileEdit } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Dummy Data
const dummyChanges: Change[] = [
    {
        id: "1",
        jiraId: "NXG-1212",
        jiraUrl: "https://jira.example.com/browse/NXG-1212",
        name: "Cambio del Sistema",
        description: "Actualización mayor del sistema operativo",
        status: "Aprobado",
        team: "UNIX",
        service: "MGR",
        owner: "Juan Sebastian",
        socialized: true,
        location: "Virtual",
        homologation: false,
        impact: "Alto",
        category: "NOCAB",
        dueDate: "2025-11-22T10:00:00Z",
    },
    {
        id: "2",
        jiraId: "NXG-1345",
        jiraUrl: "https://jira.example.com/browse/NXG-1345",
        name: "Parche de Seguridad",
        description: "Aplicación de parches críticos",
        status: "Pendiente",
        team: "Seguridad",
        service: "Firewall",
        owner: "Maria Rodriguez",
        socialized: false,
        location: "On-site",
        homologation: true,
        impact: "Medio",
        category: "Standard",
        dueDate: "2025-11-25T14:30:00Z",
    },
    {
        id: "3",
        jiraId: "NXG-2001",
        jiraUrl: "https://jira.example.com/browse/NXG-2001",
        name: "Migración de BD",
        description: "Migración a nueva instancia de base de datos",
        status: "En Progreso",
        team: "DBA",
        service: "Oracle",
        owner: "Carlos Perez",
        socialized: true,
        location: "Virtual",
        homologation: true,
        impact: "Alto",
        category: "Normal",
        dueDate: "2025-11-28T09:00:00Z",
    },
    {
        id: "4",
        jiraId: "NXG-1876",
        jiraUrl: "https://jira.example.com/browse/NXG-1876",
        name: "Reinicio de Servidor",
        description: "Reinicio programado para mantenimiento",
        status: "Rechazado",
        team: "Infraestructura",
        service: "Web Server",
        owner: "Ana Lopez",
        socialized: false,
        location: "Virtual",
        homologation: false,
        impact: "Bajo",
        category: "Standard",
        dueDate: "2025-11-20T23:00:00Z",
    },
    {
        id: "5",
        jiraId: "NXG-2134",
        jiraUrl: "https://jira.example.com/browse/NXG-2134",
        name: "Actualización de Red",
        description: "Actualización de switches principales",
        status: "Aprobado",
        team: "Redes",
        service: "Network",
        owner: "Pedro Martinez",
        socialized: true,
        location: "On-site",
        homologation: true,
        impact: "Alto",
        category: "Normal",
        dueDate: "2025-12-01T08:00:00Z",
    },
    {
        id: "6",
        jiraId: "NXG-1567",
        jiraUrl: "https://jira.example.com/browse/NXG-1567",
        name: "Cambio de Configuración",
        description: "Ajuste de parámetros de aplicación",
        status: "Pendiente",
        team: "Aplicaciones",
        service: "App Server",
        owner: "Laura Gomez",
        socialized: false,
        location: "Virtual",
        homologation: false,
        impact: "Bajo",
        category: "Standard",
        dueDate: "2025-11-30T16:00:00Z",
    },
];

const ITEMS_PER_PAGE = 5;

export default function ChangeManagementPage() {
    // Filter States
    const [nameFilter, setNameFilter] = useState("");
    const [descFilter, setDescFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState<ChangeStatus | "all">("all");
    const [teamFilter, setTeamFilter] = useState("");
    const [serviceFilter, setServiceFilter] = useState("");
    const [ownerFilter, setOwnerFilter] = useState("");
    const [socializedFilter, setSocializedFilter] = useState<"all" | "SI" | "NO">("all");
    const [locationFilter, setLocationFilter] = useState("");
    const [homologationFilter, setHomologationFilter] = useState<"all" | "SI" | "NO">("all");
    const [impactFilter, setImpactFilter] = useState<ChangeImpact | "all">("all");
    const [categoryFilter, setCategoryFilter] = useState<ChangeCategory | "all">("all");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredChanges = useMemo(() => {
        return dummyChanges.filter((change) => {
            const matchesName = change.name.toLowerCase().includes(nameFilter.toLowerCase());
            const matchesDesc = change.description.toLowerCase().includes(descFilter.toLowerCase());
            const matchesStatus = statusFilter === "all" || change.status === statusFilter;
            const matchesTeam = change.team.toLowerCase().includes(teamFilter.toLowerCase());
            const matchesService = change.service.toLowerCase().includes(serviceFilter.toLowerCase());
            const matchesOwner = change.owner.toLowerCase().includes(ownerFilter.toLowerCase());
            const matchesSocialized = socializedFilter === "all" || (socializedFilter === "SI" ? change.socialized : !change.socialized);
            const matchesLocation = change.location.toLowerCase().includes(locationFilter.toLowerCase());
            const matchesHomologation = homologationFilter === "all" || (homologationFilter === "SI" ? change.homologation : !change.homologation);
            const matchesImpact = impactFilter === "all" || change.impact === impactFilter;
            const matchesCategory = categoryFilter === "all" || change.category === categoryFilter;

            return matchesName && matchesDesc && matchesStatus && matchesTeam && matchesService && matchesOwner && matchesSocialized && matchesLocation && matchesHomologation && matchesImpact && matchesCategory;
        });
    }, [
        nameFilter, descFilter, statusFilter, teamFilter, serviceFilter, ownerFilter,
        socializedFilter, locationFilter, homologationFilter, impactFilter, categoryFilter
    ]);

    const paginatedChanges = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredChanges.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredChanges, currentPage]);

    const totalPages = Math.ceil(filteredChanges.length / ITEMS_PER_PAGE);

    const clearFilters = () => {
        setNameFilter("");
        setDescFilter("");
        setStatusFilter("all");
        setTeamFilter("");
        setServiceFilter("");
        setOwnerFilter("");
        setSocializedFilter("all");
        setLocationFilter("");
        setHomologationFilter("all");
        setImpactFilter("all");
        setCategoryFilter("all");
        setCurrentPage(1);
    };

    return (
        <div className="flex flex-col min-h-screen w-full">
            <header className="flex h-14 items-center gap-4 bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                <h1 className="text-xl font-bold tracking-tight">Gestión de Cambios</h1>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                <Card>
                    <CardHeader>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground pt-2">
                            <div className="flex items-center gap-2">
                                <FileEdit className="h-5 w-5" />
                                <span><span className="font-bold text-foreground">{filteredChanges.length}</span> Cambios Totales</span>
                            </div>
                        </div>
                    </CardHeader>
                    <Separator />
                    <CardContent className="pt-6">
                        <div className="flex flex-col gap-4">
                            {/* Search and primary filters */}
                            <div className="flex flex-col gap-4 md:flex-row">
                                <div className="relative flex-1">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Buscar por nombre..."
                                        className="w-full rounded-lg bg-background pl-8"
                                        value={nameFilter}
                                        onChange={(e) => {
                                            setNameFilter(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                    />
                                </div>
                                <div className="relative flex-1">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Buscar descripción..."
                                        className="w-full rounded-lg bg-background pl-8"
                                        value={descFilter}
                                        onChange={(e) => {
                                            setDescFilter(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Filter Row 1 */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                                <Select value={statusFilter} onValueChange={(val) => {
                                    setStatusFilter(val as ChangeStatus | "all");
                                    setCurrentPage(1);
                                }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Estado" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Estado</SelectItem>
                                        <SelectItem value="Aprobado">Aprobado</SelectItem>
                                        <SelectItem value="Pendiente">Pendiente</SelectItem>
                                        <SelectItem value="Rechazado">Rechazado</SelectItem>
                                        <SelectItem value="En Progreso">En Progreso</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Input
                                    placeholder="Equipo"
                                    value={teamFilter}
                                    onChange={(e) => {
                                        setTeamFilter(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                />
                                <Input
                                    placeholder="Servicio"
                                    value={serviceFilter}
                                    onChange={(e) => {
                                        setServiceFilter(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                />
                                <Input
                                    placeholder="Dueño"
                                    value={ownerFilter}
                                    onChange={(e) => {
                                        setOwnerFilter(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                />
                                <Input
                                    placeholder="Localización"
                                    value={locationFilter}
                                    onChange={(e) => {
                                        setLocationFilter(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                />
                            </div>

                            {/* Filter Row 2 */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                                <Select value={socializedFilter} onValueChange={(val) => {
                                    setSocializedFilter(val as "all" | "SI" | "NO");
                                    setCurrentPage(1);
                                }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Socializado" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Socializado</SelectItem>
                                        <SelectItem value="SI">SI</SelectItem>
                                        <SelectItem value="NO">NO</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select value={homologationFilter} onValueChange={(val) => {
                                    setHomologationFilter(val as "all" | "SI" | "NO");
                                    setCurrentPage(1);
                                }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Homologación" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Homologación</SelectItem>
                                        <SelectItem value="SI">SI</SelectItem>
                                        <SelectItem value="NO">NO</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select value={impactFilter} onValueChange={(val) => {
                                    setImpactFilter(val as ChangeImpact | "all");
                                    setCurrentPage(1);
                                }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Impacto" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Impacto</SelectItem>
                                        <SelectItem value="Alto">Alto</SelectItem>
                                        <SelectItem value="Medio">Medio</SelectItem>
                                        <SelectItem value="Bajo">Bajo</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select value={categoryFilter} onValueChange={(val) => {
                                    setCategoryFilter(val as ChangeCategory | "all");
                                    setCurrentPage(1);
                                }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Categoría" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Categoría</SelectItem>
                                        <SelectItem value="NOCAB">NOCAB</SelectItem>
                                        <SelectItem value="Standard">Standard</SelectItem>
                                        <SelectItem value="Normal">Normal</SelectItem>
                                        <SelectItem value="Emergency">Emergency</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button variant="secondary" onClick={clearFilters} className="w-full">
                                    Borrar filtros
                                </Button>
                            </div>
                        </div>

                        <ChangeTable changes={paginatedChanges} />

                        {/* Pagination */}
                        <div className="flex items-center justify-between mt-4">
                            <div className="text-sm text-muted-foreground">
                                Mostrando página {currentPage} de {totalPages || 1}
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                >
                                    Anterior
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages || totalPages === 0}
                                >
                                    Siguiente
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}

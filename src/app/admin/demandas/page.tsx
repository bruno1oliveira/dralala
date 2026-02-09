import { getDemandas } from "@/lib/api/demandas";
import DemandasClient from "@/components/admin/DemandasClient";
import { DemandaStatus, DemandaTipo } from "@/types/database.types";

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function DemandasPage({ searchParams }: PageProps) {
    const resolvedSearchParams = await searchParams;
    const search = typeof resolvedSearchParams.search === 'string' ? resolvedSearchParams.search : undefined;
    const status = typeof resolvedSearchParams.status === 'string' && resolvedSearchParams.status !== 'all'
        ? (resolvedSearchParams.status as DemandaStatus)
        : undefined;
    const tipo = typeof resolvedSearchParams.tipo === 'string' && resolvedSearchParams.tipo !== 'all'
        ? (resolvedSearchParams.tipo as DemandaTipo)
        : undefined;

    const demandas = await getDemandas({
        search,
        status,
        tipo,
    });

    return <DemandasClient demandas={demandas} />;
}

import { getDemandas, getDemandasStats } from "@/lib/api/demandas";
import { getContatosStats } from "@/lib/api/contatos";
import DashboardClient from "@/components/admin/DashboardClient";

// A página é um Server Component por padrão
export const dynamic = "force-dynamic";
export default async function AdminDashboard() {
    const [demandasStats, recentDemandas, contatosStats] = await Promise.all([
        getDemandasStats(),
        getDemandas({ search: "" }),
        getContatosStats(),
    ]);

    // Limitar as recentes a 5 no cliente ou aqui
    const limitedRecentDemandas = recentDemandas.slice(0, 5);

    return (
        <DashboardClient
            stats={demandasStats}
            recentDemandas={limitedRecentDemandas}
            contatosCount={contatosStats.total}
        />
    );
}

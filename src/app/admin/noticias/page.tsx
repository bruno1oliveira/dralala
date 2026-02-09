import { getNoticias } from "@/lib/api/noticias";
import NoticiasClient from "@/components/admin/NoticiasClient";
import { NoticiaStatus } from "@/types/database.types";

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function NoticiasPage({ searchParams }: PageProps) {
    const resolvedSearchParams = await searchParams;
    const search = typeof resolvedSearchParams.search === 'string' ? resolvedSearchParams.search : undefined;
    const status = typeof resolvedSearchParams.status === 'string' && resolvedSearchParams.status !== 'all'
        ? (resolvedSearchParams.status as NoticiaStatus)
        : undefined;

    const noticias = await getNoticias({
        search,
        status,
    });

    return <NoticiasClient noticias={noticias} />;
}

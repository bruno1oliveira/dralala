import { getContatos } from "@/lib/api/contatos";
import ContatosClient from "@/components/admin/ContatosClient";

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ContatosPage({ searchParams }: PageProps) {
    const resolvedSearchParams = await searchParams;
    const search = typeof resolvedSearchParams.search === 'string' ? resolvedSearchParams.search : undefined;
    const isApoiador = resolvedSearchParams.apoiador === 'true';

    const contatos = await getContatos({
        search,
        isApoiador: isApoiador ? true : undefined,
    });

    return <ContatosClient contatos={contatos} />;
}

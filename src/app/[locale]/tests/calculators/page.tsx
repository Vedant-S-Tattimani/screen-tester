import { redirect } from "next/navigation";

export default async function CalculatorsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/tests/compare-displays`);
}

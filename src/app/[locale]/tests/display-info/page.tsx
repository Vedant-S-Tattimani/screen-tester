import { redirect } from "next/navigation";

export default async function DisplayInfoPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/tests/resolution-checker`);
}

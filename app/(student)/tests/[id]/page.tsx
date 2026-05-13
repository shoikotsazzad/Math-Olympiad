import { tests, sampleQuestions } from "@/lib/mock/tests";
import TestEngine from "@/components/test/TestEngine";
import { notFound } from "next/navigation";

export default async function TestPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const test = tests.find((t) => t.id === id) ?? tests[0];
  if (!test) notFound();

  return <TestEngine test={test} questions={sampleQuestions} />;
}

export function generateStaticParams() {
  return tests.map((t) => ({ id: t.id }));
}

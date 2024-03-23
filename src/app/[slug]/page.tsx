export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div className="p-4 lg:p-6">
      <h1 className="text-lg font-semibold md:text-2xl">
        My Node ID: {params.slug}
      </h1>
    </div>
  );
}

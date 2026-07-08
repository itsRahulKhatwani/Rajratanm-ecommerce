export default function EditBlogPage() {
  return (
    <div>
      <h1 className="font-playfair text-3xl font-bold text-gold mb-8">Edit Blog</h1>
      <div className="text-center py-16 rounded-2xl border border-gold/10 bg-navy-light/50">
        <p className="text-ivory/40">
          Blog editing will be available once the database is connected.
          <br />Connect Supabase and run Prisma migrations to enable this feature.
        </p>
      </div>
    </div>
  );
}

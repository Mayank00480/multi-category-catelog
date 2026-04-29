import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  catalog,
  getItemBySlug,
  getItemsByCategory,
  toSlug,
} from "@/data/catalog";
import Header from "@/app/components/Header";
import ItemCard from "@/app/components/ItemCard";
import styles from "./page.module.css";

const CATEGORY_META: Record<string, { accentVar: string; icon: string }> = {
  Cars: { accentVar: "--color-cars", icon: "🚗" },
  Bikes: { accentVar: "--color-bikes", icon: "🏍️" },
  Phones: { accentVar: "--color-phones", icon: "📱" },
  Computers: { accentVar: "--color-computers", icon: "💻" },
};

export async function generateStaticParams() {
  return catalog.map((item) => ({ slug: toSlug(item.itemname) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getItemBySlug(slug);
  if (!item) return { title: "Not Found" };
  return {
    title: `${item.itemname} — CatalogX`,
    description: `Explore full specifications of the ${item.itemname}.`,
  };
}

export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getItemBySlug(slug);

  if (!item) notFound();

  const meta = CATEGORY_META[item.category] ?? CATEGORY_META["Cars"];
  const related = getItemsByCategory(item.category)
    .filter((i) => toSlug(i.itemname) !== slug)
    .slice(0, 4);

  return (
    <>
      <Header />
      <main
        className={styles.main}
        style={
          {
            "--accent": `var(${meta.accentVar})`,
            "--accent-light": `var(${meta.accentVar}-light)`,
            "--accent-mid": `var(${meta.accentVar}-mid)`,
          } as React.CSSProperties
        }
      >
        {/* Breadcrumb */}
        <div className={styles.breadcrumbBar}>
          <div className={styles.breadcrumbInner}>
            <Link href="/" className={styles.breadcrumbLink}>
              Home
            </Link>
            <span className={styles.breadcrumbSep}>/</span>
            <Link
              href={`/#${item.category.toLowerCase()}`}
              className={styles.breadcrumbLink}
            >
              {meta.icon} {item.category}
            </Link>
            <span className={styles.breadcrumbSep}>/</span>
            <span className={styles.breadcrumbCurrent}>{item.itemname}</span>
          </div>
        </div>

        {/* Detail card */}
        <div className={styles.detailWrapper}>
          <div className={styles.detailCard}>
            {/* Image panel */}
            <div className={styles.imagePanel}>
              <div className={styles.imageFrame}>
                <Image
                  src={item.image}
                  alt={item.itemname}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.image}
                  unoptimized
                />
              </div>
              <span className={styles.categoryPill}>
                {meta.icon}&nbsp;&nbsp;{item.category}
              </span>
            </div>

            {/* Info panel */}
            <div className={styles.infoPanel}>
              <h1 className={styles.itemName}>{item.itemname}</h1>
              <p className={styles.itemCategory}>
                Category:{" "}
                <strong style={{ color: "var(--accent)" }}>
                  {item.category}
                </strong>
              </p>

              <div className={styles.divider} />

              <h2 className={styles.specsTitle}>Specifications</h2>
              <ul className={styles.specsList}>
                {item.itemprops.map((prop) => (
                  <li key={prop.label} className={styles.specRow}>
                    <span className={styles.specLabel}>{prop.label}</span>
                    <span className={styles.specValue}>{prop.value}</span>
                  </li>
                ))}
              </ul>

              <div className={styles.actions}>
                <Link href="/" className={styles.backBtn}>
                  ← Back to Catalog
                </Link>
                <Link
                  href={`/#${item.category.toLowerCase()}`}
                  className={styles.categoryBtn}
                >
                  All {item.category}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related items */}
        {related.length > 0 && (
          <div className={styles.relatedSection}>
            <div className={styles.relatedInner}>
              <h2 className={styles.relatedTitle}>
                More {meta.icon} {item.category}
              </h2>
              <div className={styles.relatedGrid}>
                {related.map((relItem) => (
                  <ItemCard
                    key={relItem.itemname}
                    item={relItem}
                    accentVar={meta.accentVar}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <p>
          © {new Date().getFullYear()} CatalogX · Multi-Category Product
          Explorer
        </p>
      </footer>
    </>
  );
}

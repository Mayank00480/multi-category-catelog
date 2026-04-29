import { catalog, getCategories, getItemsByCategory } from "@/data/catalog";
import ItemCard from "@/app/components/ItemCard";
import Header from "@/app/components/Header";
import styles from "./page.module.css";

const CATEGORY_META: Record<
  string,
  { accentVar: string; icon: string; description: string }
> = {
  Cars: {
    accentVar: "--color-cars",
    icon: "🚗",
    description: "Sedans, SUVs, sports cars and electric vehicles",
  },
  Bikes: {
    accentVar: "--color-bikes",
    icon: "🏍️",
    description: "Superbikes, cruisers, adventure and street motorcycles",
  },
  Phones: {
    accentVar: "--color-phones",
    icon: "📱",
    description: "Flagship smartphones from top brands worldwide",
  },
  Computers: {
    accentVar: "--color-computers",
    icon: "💻",
    description: "Laptops, notebooks and ultrabooks for every need",
  },
};

export default function HomePage() {
  const categories = getCategories();
  const totalItems = catalog.length;

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.heroEyebrow}>
              {totalItems} items across {categories.length} categories
            </p>
            <h1 className={styles.heroTitle}>
              Explore the <span className={styles.heroAccent}>Ultimate</span>{" "}
              Product Catalog
            </h1>
            <p className={styles.heroSub}>
              Browse handpicked cars, bikes, phones, and computers — all in one
              beautifully organised place.
            </p>
          </div>
          <div className={styles.statRow}>
            {categories.map((cat) => {
              const meta = CATEGORY_META[cat];
              const count = getItemsByCategory(cat).length;
              return (
                <a
                  key={cat}
                  href={`#${cat.toLowerCase()}`}
                  className={styles.statCard}
                  style={
                    {
                      "--cat-accent": `var(${meta?.accentVar ?? "--color-cars"})`,
                      "--cat-accent-light": `var(${meta?.accentVar ?? "--color-cars"}-light)`,
                    } as React.CSSProperties
                  }
                >
                  <span className={styles.statIcon}>{meta?.icon}</span>
                  <span className={styles.statCount}>{count}</span>
                  <span className={styles.statLabel}>{cat}</span>
                </a>
              );
            })}
          </div>
        </section>

        <div className={styles.catalogWrapper}>
          {categories.map((category) => {
            const meta = CATEGORY_META[category];
            const items = getItemsByCategory(category);
            return (
              <section
                key={category}
                id={category.toLowerCase()}
                className={styles.categorySection}
                style={
                  {
                    "--cat-accent": `var(${meta?.accentVar ?? "--color-cars"})`,
                    "--cat-accent-light": `var(${meta?.accentVar ?? "--color-cars"}-light)`,
                    "--cat-accent-mid": `var(${meta?.accentVar ?? "--color-cars"}-mid)`,
                  } as React.CSSProperties
                }
              >
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionTitleGroup}>
                    <span className={styles.sectionIcon}>{meta?.icon}</span>
                    <div>
                      <h2 className={styles.sectionTitle}>{category}</h2>
                      <p className={styles.sectionDesc}>{meta?.description}</p>
                    </div>
                  </div>
                  <span className={styles.sectionCount}>
                    {items.length} item{items.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className={styles.scrollTrack}>
                  <div className={styles.cardRow}>
                    {items.map((item) => (
                      <ItemCard
                        key={item.itemname}
                        item={item}
                        accentVar={meta?.accentVar ?? "--color-cars"}
                      />
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} CatalogX · Multi-Category Product Explorer</p>
      </footer>
    </>
  );
}

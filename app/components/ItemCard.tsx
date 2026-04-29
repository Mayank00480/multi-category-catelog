import Image from "next/image";
import Link from "next/link";
import { CatalogItem, toSlug } from "@/data/catalog";
import styles from "./ItemCard.module.css";

interface ItemCardProps {
  item: CatalogItem;
  accentVar: string;
}

export default function ItemCard({ item, accentVar }: ItemCardProps) {
  const slug = toSlug(item.itemname);
  const previewProps = item.itemprops.slice(0, 2);

  return (
    <Link
      href={`/item/${slug}`}
      className={styles.card}
      style={{ "--accent": `var(${accentVar})`, "--accent-light": `var(${accentVar}-light)` } as React.CSSProperties}
    >
      <div className={styles.imageWrapper}>
        <Image
          src={item.image}
          alt={item.itemname}
          fill
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 280px"
          className={styles.image}
          unoptimized
        />
        <span className={styles.categoryBadge}>{item.category}</span>
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{item.itemname}</h3>
        {previewProps.length > 0 && (
          <ul className={styles.propList}>
            {previewProps.map((prop) => (
              <li key={prop.label} className={styles.propItem}>
                <span className={styles.propLabel}>{prop.label}</span>
                <span className={styles.propValue}>{prop.value}</span>
              </li>
            ))}
          </ul>
        )}
        <span className={styles.viewBtn}>View Details →</span>
      </div>
    </Link>
  );
}

type LdObject = Record<string, unknown> & { '@type'?: string };

type JsonLdProps = {
  /** Uno o varios objetos JSON-LD; se emiten como scripts separados. */
  data: LdObject | LdObject[];
};

/** Inserta datos estructurados (schema.org) como `<script type="application/ld+json">`. */
export function JsonLd({ data }: JsonLdProps) {
  const items = Array.isArray(data) ? data : [data];

  return (
    <>
      {items.map((item, index) => (
        <script
          key={item['@type'] ?? index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}

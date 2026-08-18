/**
 * Structured data.
 *
 * Serialised with `JSON.stringify` and escaped for the one sequence that can
 * break out of a script element. Nothing in the content collections should
 * ever contain `</script`, but the escape is cheap and the failure mode —
 * arbitrary markup injected into every page — is not.
 *
 * Only facts that already appear in the visible page go in here. In
 * particular: no phone number, no citizenship, no birthday, no home address,
 * and no rating, review or offer markup, none of which there is evidence for.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

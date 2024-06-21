import Container from "../Containers/container";
import { H1Tags, PTags } from "../Text";
import classes from "./index.module.css";

export default function About() {
  const spanStyle = {
    fontSize: "2rem",
    lineHeight: "1rem",
  };
  return (
    <Container flex="column" width="100%" margin="5rem 0 0 0">
      <div className={classes["about-header"]}>
        <H1Tags>About GoldenAgro</H1Tags>
      </div>
      <div className={classes.banner}>
        <Container margin="0 1rem" padding="1rem" flex="column">
          <p className={classes.paragraph}>
            <span style={spanStyle}>W</span>
            elcome to GoldenAgro, your premium destination for authentic
            Nigerian rice! At GoldenAgro, we take immense pride in offering you
            the finest quality Nigerian rice, cultivated with care and expertise
            by local farmers across the lush landscapes of Nigeria. Our journey
            began with a simple yet powerful vision: to redefine the rice market
            by delivering superior quality, flavor, and sustainability straight
            to your table. At GoldenAgro, we harness our great cultural heritage
            and legacy to bring you rice that not only delights your taste buds
            but also supports local communities and promotes sustainable farming
            practices. Every grain of rice we offer reflects our commitment to
            excellence, from the fertile fields where it's grown to the
            meticulous processes that ensure its purity and freshness.
          </p>

          <p className={classes.paragraph}>
            <span style={spanStyle}>W</span>e work closely with local farmers,
            providing them with the resources and support they need to cultivate
            rice of exceptional quality while respecting the environment and
            preserving natural resources for future generations. When you choose
            GoldenAgro, you're not just buying rice, you're investing in a
            tradition of excellence, sustainability, and community empowerment.
            With every purchase, you're supporting local farmers and their
            families, promoting economic growth, and contributing to a brighter,
            more sustainable future for Nigeria and beyond. Join us on our
            mission to elevate the standard of rice consumption and experience
            the GoldenAgro difference for yourself. Whether you're cooking up a
            family feast or preparing a special meal, trust GoldenAgro to bring
            the authentic flavors of Nigeria to your table, one delicious grain
            at a time.
          </p>
        </Container>
      </div>
    </Container>
  );
}

"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type Result = {
  cards: {
    front: string;
    id: string;
    back: string;
    similarity: number;
  }[];
};
const arry = [
  {
    id: "a03my1jvwt9r4tlzq6n18k7f",
    front:
      "59) In the territorial behavior of the stickleback fish, the red belly of one male that elicits attack from another male is functioning as A) a pheromone. B) a sign stimulus. C) a fixed action pattern. D) a search image. E) an imprint stimulus.",
    similarity: 1.0,
    back: "B",
  },
  {
    id: "a0wyqoab29jrfsap01p5r9lz",
    front:
      "38) Which pattern of reproduction is correctly paired with a species? A) iteroparityPacific salmon B) iteroparityelephant C) semelparityoak tree D) semelparityrabbit E) semelparity–polar bear",
    similarity: 1.0,
    back: "B",
  },
  {
    id: "a1fd5dtxckwq6vqg1b8j15e8",
    front:
      "Through time, the lineage that led to modern whales shows a change from four-limbed land animals to aquatic animals with two limbs that function as flippers. This change is best explained by A) natural philosophy. B) creationism. C) the hierarchy of the biological organization of life. D) natural selection. E) feedback inhibition.",
    similarity: 1.0,
    back: "D",
  },
  {
    id: "a1v9lckog5m3xsrahb4ozkr9",
    front:
      "card image Which component is cholesterol? A) A B) B C) C D) D E) E",
    similarity: 1.0,
    back: "E",
  },
  {
    id: "a22v9eu2va1q02ard9kbraiu",
    front:
      "Which of the following is true regarding saturated fatty acids? A) They are the predominant fatty acid in corn oil. B) They have double bonds between carbon atoms of the fatty acids. C) They are the principal molecules in lard and butter. D) They are usually liquid at room temperature. E) They are usually produced by plants.",
    similarity: 1.0,
    back: "C",
  },
  {
    id: "a2b3c73m7b8b51qmmu9353ut",
    front:
      "27) What is the role of DNA ligase in the elongation of the lagging strand during DNA replication? A) It synthesizes RNA nucleotides to make a primer. B) It catalyzes the lengthening of telomeres. C) It joins Okazaki fragments together. D) It unwinds the parental double helix. E) It stabilizes the unwound parental DNA.",
    similarity: 1.0,
    back: "C",
  },
  {
    id: "a2o86vn7kpfo46cvs8fewp1l",
    front:
      "electron flow may be photoprotective (protective to light-induced damage). Which of the following experiments could provide information on this phenomenon? A) use mutated organisms that can grow but that cannot carry out cyclic flow of electrons and compare their abilities to photosynthesize in different light intensities against those of wild-type organisms B) use plants that can carry out both linear and cyclic electron flow, or only one or another of these processes, and compare their light absorbance at different wavelengths and different light intensities C) use bacteria that have only cyclic flow and look for their frequency of mutation damage at different light intensities D) use bacteria with only cyclic flow and measure the number and types of photosynthetic pigments they have in their membranes E) use plants with only photosystem I operative and measure how much damage occurs at different wavelengths",
    similarity: 1.0,
    back: "A",
  },
  {
    id: "a32h2raroescjps9ukpe2crz",
    front:
      "5) Resource partitioning would be most likely to occur between A) sympatric populations of a predator and its prey. B) sympatric populations of species with similar ecological niches. C) sympatric populations of a flowering plant and its specialized insect pollinator. D) allopatric populations of the same animal species. E) allopatric populations of species with similar ecological niches.",
    similarity: 1.0,
    back: "B",
  },
  {
    id: "a40ovrxwu9jcgvvp1slvxflj",
    front:
      "A given solution contains 0.0001(10⁻⁴) moles of hydrogen ions [H⁺] per liter. Which of the following best describes this solution? A) acidic: will accept H⁺ from both strong and weak acids B) basic: will accept H⁺ from both strong and weak acids C) acidic: will give H⁺ to weak acids, but accept H+ from strong acids D) basic: will give H⁺ to weak acids, but accept H⁺ from weak acids E) acidic: will give H⁺ to both strong and weak acids",
    similarity: 1.0,
    back: "C",
  },
  {
    id: "a4ckkq38tfn446oyzblhthie",
    front:
      "Which of these is an example of inductive reasoning? A) Hundreds of individuals of a species have been observed and all are photosynthetic; therefore, the species is photosynthetic. B) These organisms live in sunny parts of this area so they are able to photosynthesize. C) If horses are always found grazing on grass, they can be only herbivores and not omnivores. D) If protists are all single-celled, then they are incapable of aggregating. E) If two species are members of the same genus, they are more alike than each of them could be to a different genus.",
    similarity: 1.0,
    back: "A",
  },
  {
    id: "a4n5c0hkmobyjjr4q9tbsx0d",
    front:
      "card image Which portion of the pathway in Figure 9.1 involves an endergonic reaction? A) A B) B C) C D) D E) E",
    similarity: 1.0,
    back: "A",
  },
];
export default function SearchPage() {
  const [search, setSearch] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState<Result>({
    cards: arry,
  });

  const params = useParams();

  React.useEffect(() => {
    if (params.lesson) {
      setSearch(
        typeof params.lesson === "string"
          ? params.lesson.replaceAll("-", " ")
          : "",
      );
    }
  }, [params]);

  const handleSearch = () => {
    if (search && search.length === 0) {
      setSearchResults({ cards: [] });
    } else {
      setIsLoading(true);

      fetch(`/api/flashcards?q=${encodeURIComponent(search)}`)
        .then(async (results) => {
          const json = (await results.json()) as Result;
          setIsLoading(false);
          setSearchResults(json);
        })
        .catch((e) => {
          console.error(e);
          toast.error("Something went wrong, please try again later.");
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Search Flashcards</h1>
      <div className="mb-4 flex gap-2">
        <Input
          type="text"
          placeholder="Search flashcards..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleSearch} disabled={isLoading}>
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>
      {isLoading && <p>Searching...</p>}
      {!isLoading &&
        searchResults &&
        searchResults.cards.length === 0 &&
        search !== "" && <p>No results found.</p>}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {searchResults.cards.map((card) => (
          <Card key={card.id}>
            <CardHeader>
              <CardTitle>{card.front}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{card.back}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

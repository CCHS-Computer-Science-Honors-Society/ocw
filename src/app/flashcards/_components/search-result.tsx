import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface SearchResult {
  id: string;
  front: string;
  back: string;
  similarity: number;
}

interface SearchResultsProps {
  results: SearchResult[];
}

export function SearchResults({ results }: SearchResultsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {results.map((result) => (
        <Card key={result.id}>
          <CardHeader>
            <CardTitle>{result.front}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{result.back}</p>
            <p className="text-muted-foreground mt-2 text-sm">
              Similarity: {(result.similarity * 100).toFixed(2)}%
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

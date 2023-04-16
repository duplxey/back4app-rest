import Parse from "parse/dist/parse.min.js";
import {Card, CardBody, Container, Heading, Link, Spinner, Stack, Text} from "@chakra-ui/react";
import NextLink from "next/link";
import {useEffect, useState} from "react";

export default function Home() {

  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  const getArticles = async () => {
    const query = new Parse.Query("Article");
    setArticles(await query.find());
    setIsLoading(false);
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <>
      <main>
        <Container maxW="container.lg">
          <Heading as="h1" my="4">back4app-rest</Heading>
          {isLoading ? (
            <Spinner size="lg"/>
          ) : (
            <Stack spacing="4" direction="column">
              {articles.map((article, index) => (
                <Card key={index} w="100%">
                  <CardBody>
                    <Stack spacing="3">
                      <Heading size="md">
                        <Link as={NextLink} href={article.get("shrug")}>
                          {article.get("title")}
                        </Link>
                      </Heading>
                      <Text>
                        {article.get("shortContent")}
                      </Text>
                    </Stack>
                  </CardBody>
                </Card>
              ))}
            </Stack>
          )}
        </Container>
      </main>
    </>
  );
}

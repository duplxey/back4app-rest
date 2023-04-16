import Parse from "parse/dist/parse.min.js";
import {useRouter} from "next/router";
import {Card, CardBody, Container, Heading, Link, Spinner, Stack, Text} from "@chakra-ui/react";
import NextLink from "next/link";
import {useEffect, useState} from "react";

export default function Article() {

  const router = useRouter();
  const {shrug} = router.query;

  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState(null);

  const getArticle = async () => {
    const query = new Parse.Query("Article");
    query.equalTo("shrug", shrug);
    const results = await query.find();
    setIsLoading(false);
    if (results.length === 0) return;
    setArticle(results[0]);
  };

  useEffect(() => {
    getArticle();
  }, []);

  return (
    <>
      <main>
        <Container maxW="container.lg">
          <Heading as="h1" my="4">back4app-rest</Heading>
          {isLoading ? (
            <Spinner size="lg"/>
          ) : (
            <>
              {article == null ? (
                <Text>This article does not exist.</Text>
              ) : (
                <Card w="100%">
                  <CardBody>
                    <Stack spacing="3">
                      <Heading size="md">{article.get("title")}</Heading>
                      <Text>
                        {article.get("content")}
                      </Text>
                      <Text fontSize="sm">
                        Posted on {new Date(article.get("createdAt")).toDateString()}
                      </Text>
                    </Stack>
                  </CardBody>
                </Card>
              )}
            </>
          )}
          <Text size="sm" mt="2" align="right"><Link as={NextLink} href="/">← Go back</Link></Text>
        </Container>
      </main>
    </>
  );
}

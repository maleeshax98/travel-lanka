
import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";

const POSTS_QUERY = `*[
  _type == "destination"
  && defined(slug.current) && isTrending == true
][0...4]{_id, name, slug, publishedAt, mainImage, location}`;

const options = { next: { revalidate: 30 } };

import { Destination } from "@/components/Home/TrendingDestinations/DestinationList";

const getTrendingDestinations =  async(): Promise<Destination[]> => {
    const destinations = await client.fetch<Destination[]>(POSTS_QUERY, {}, options);
    return destinations
}

export { getTrendingDestinations }


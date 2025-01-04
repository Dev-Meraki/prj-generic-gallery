export type Modes = 'INPLAY | GALLERY' | 'PLAY';
export interface GALLERY {
  items: Array<string>;
  nextPageToken: string | undefined;
}
// interface for Marvel API
export interface MarvelApiResponse {
  code: number; // The HTTP status code of the returned result.
  status: string; // A string description of the call status.
  copyright: string; // The copyright notice for the returned result.
  attributionText: string; // The attribution notice for this result.
  // Please display either this notice or the contents of the attributionHTML field
  // on all screens which contain data from the Marvel Comics API.
  attributionHTML: string; // An HTML representation of the attribution notice for this result.
  // Please display either this notice or the contents of the attributionText field
  // on all screens which contain data from the Marvel Comics API.
  data: CharacterDataContainer; // The results returned by the call.
  etag: string; // A digest value of the content returned by the call.
  page: number;
}
export interface CharacterDataContainer {
  offset: number; // The requested offset (number of skipped results) of the call.
  limit: number; // The requested result limit.
  total: number; // The total number of resources available given the current filter set.
  count: number; // The total number of results returned by this call.
  results: Character[]; // The list of characters returned by the call.
}

export interface Character {
  id: number; // The unique ID of the character resource.
  name: string; // The name of the character.
  description: string; // A short bio or description of the character.
  modified: Date; // The date the resource was most recently modified.
  resourceURI: string; // The canonical URL identifier for this resource.
  urls: Url[]; // A set of public website URLs for the resource.
  thumbnail: Image; // The representative image for this character.
  comics: ComicList; // A resource list containing comics featuring this character.
  stories: StoryList; // A resource list of stories in which this character appears.
  events: EventList; // A resource list of events in which this character appears.
  series: SeriesList; // A resource list of series in which this character appears.
}

interface Url {
  type?: string; // The type of URL (e.g., "detail", "wiki", "comiclink").
  url?: string; // The full URL.
}

interface Image {
  path?: string; // The path to the image.
  extension?: string; // The image file extension (e.g., "jpg", "png").
}

interface ComicList {
  available?: number; // The number of available comics in this list.
  collectionURI?: string; // The path to the full list of comics.
  items?: ComicSummary[]; // A list of summary information for comics in this list.
  returned?: number; // The number of comics returned in this collection (up to the limit).
}

interface ComicSummary {
  resourceURI?: string; // The path to the individual comic resource.
  name?: string; // The name of the comic.
}

interface StoryList {
  available?: number; // The number of available stories in this list.
  collectionURI?: string; // The path to the full list of stories.
  items?: StorySummary[]; // A list of summary information for stories in this list.
  returned?: number; // The number of stories returned in this collection (up to the limit).
}

interface StorySummary {
  resourceURI?: string; // The path to the individual story resource.
  name?: string; // The name of the story.
  type?: string; // The type of the story (e.g., "cover", "interiorStory").
}

interface EventList {
  available?: number; // The number of available events in this list.
  collectionURI?: string; // The path to the full list of events.
  items?: EventSummary[]; // A list of summary information for events in this list.
  returned?: number; // The number of events returned in this collection (up to the limit).
}

interface EventSummary {
  resourceURI?: string; // The path to the individual event resource.
  name?: string; // The name of the event.
}

interface SeriesList {
  available?: number; // The number of available series in this list.
  collectionURI?: string; // The path to the full list of series.
  items?: SeriesSummary[]; // A list of summary information for series in this list.
  returned?: number; // The number of series returned in this collection (up to the limit).
}

interface SeriesSummary {
  resourceURI?: string; // The path to the individual series resource.
  name?: string; // The name of the series.
}

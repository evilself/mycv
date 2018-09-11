export interface CVListItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
}

export interface GetCVsListResponse {
  content: CVListItem[];
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  sort: {
    ascending: boolean;
    direction: string
    ignoreCase: boolean;
    nullHandling: string;
    property: string;
  };
  totalElements: number;
  totalPages: number;
}

export interface CVDetails extends CVListItem {
  dateOfBirth: string;
}

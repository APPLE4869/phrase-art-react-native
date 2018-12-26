import { combineReducers } from "redux";
import auth, { State as AuthState } from "./auth";
import categories, { State as CategoriesState } from "./categories";
import currentProfile, { State as CurrentProfileState } from "./currentProfile";
import loading, { State as LoadingState } from "./loading";
import authors, { State as AuthorsState } from "./phrase/authors";
import phraseComment, { State as phraseCommentState } from "./phrase/phraseComment";
import phrases, { State as PhrasesState } from "./phrase/phrases";
import phrasesListStatus, { State as PhrasesListStatusState } from "./phrase/PhrasesListStatus";
import quickblox, { State as QuickbloxState } from "./Quickblox";
import subcategories, { State as SubcategoriesState } from "./subcategories";
import updateRequests, { State as UpdateRequestState } from "./updateRequest";
import phraseDeletionRequest, { State as PhraseDeletionRequestState } from "./updateRequest/phraseDeletionRequest";
import phraseModificationRequest, {
  State as PhraseModificationRequestState
} from "./updateRequest/phraseModificationRequest";
import phraseRegistrationRequest, {
  State as PhraseRegistrationRequestState
} from "./updateRequest/phraseRegistrationRequest";
import subcategoryModificationRequest, {
  State as SubcategoryModificationRequestState
} from "./updateRequest/subcategoryModificationRequest";
import updateRequestComment, { State as updateRequestCommentState } from "./updateRequest/updateRequestComment";
import videoOnDemands, { State as VideoOnDemandsState } from "./videoOnDemands";

export interface State {
  phrases: PhrasesState;
  categories: CategoriesState;
  subcategories: SubcategoriesState;
  auth: AuthState;
  loading: LoadingState;
  updateRequests: UpdateRequestState;
  phraseRegistrationRequest: PhraseRegistrationRequestState;
  phraseModificationRequest: PhraseModificationRequestState;
  phraseDeletionRequest: PhraseDeletionRequestState;
  subcategoryModificationRequest: SubcategoryModificationRequestState;
  phraseComment: phraseCommentState;
  updateRequestComment: updateRequestCommentState;
  quickblox: QuickbloxState;
  phrasesListStatus: PhrasesListStatusState;
  videoOnDemands: VideoOnDemandsState;
  currentProfile: CurrentProfileState;
  authors: AuthorsState;
}

export default combineReducers({
  phrases,
  categories,
  subcategories,
  auth,
  loading,
  updateRequests,
  phraseRegistrationRequest,
  phraseModificationRequest,
  phraseDeletionRequest,
  subcategoryModificationRequest,
  phraseComment,
  quickblox,
  phrasesListStatus,
  videoOnDemands,
  currentProfile,
  updateRequestComment,
  authors
});

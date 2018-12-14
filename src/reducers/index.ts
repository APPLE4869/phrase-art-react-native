import { combineReducers } from "redux";
import auth, { State as AuthState } from "./auth";
import categories, { State as CategoriesState } from "./categories";
import loading, { State as LoadingState } from "./loading";
import phraseComment, { State as phraseCommentState } from "./phrase/phraseComment";
import phrases, { State as PhrasesState } from "./phrase/phrases";
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
  phraseComment: phraseCommentState;
  quickblox: QuickbloxState;
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
  phraseComment,
  quickblox
});

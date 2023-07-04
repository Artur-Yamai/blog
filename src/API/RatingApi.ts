import { Rating } from "../Types";
import RepositoryHelper from "../helpers/RepositoryHelper";
const resource = "/rating";

export const RatingApi = {
  getRatingEndpoint: () => `${resource}`,

  async saveRating(rating: Rating) {
    return await RepositoryHelper.save(rating, this.getRatingEndpoint());
  },
};

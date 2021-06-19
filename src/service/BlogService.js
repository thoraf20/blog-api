import {BlogModel} from '../database/model/Blog';
import User from '../database/model/User';

export default class BlogService {
    static AUTHOR_DETAIL = 'name profilePicUrl';
    static BLOG_INFO_ADDITIONAL = '+isSubmitted +isDraft +isPublished +createdBy +updatedBy';
    static BLOG_ALL_DATA =  '+text +draftText +isSubmitted +isDraft +isPublished +createdBy +updatedBy';

    static async create (blog) {
        const now = new Date();
        blog.createdAt = now;
        blog.updatedAt = now;
        const createdBlog = await BlogModel.create(blog);
        return createdBlog.toObject(); 
    }

    static update (blog) {
        blog.updatedAt = new Date();
        return BlogModel.updateOne({_id: blog._id}, {$set: {...blog}})
        .lean()
        .exec();
    }

    static findInfoById (id) {
        return BlogModel.findOne({_id: id, status: true})
        .populate('author', this.AUTHOR_DETAIL)
        .lean()
        .exec();
    }

    static findInfoWithTextById (id) {
        return BlogModel.findOne({_id: id, status: true})
        .select('+text')
        .populate('author', this.AUTHOR_DETAIL)
        .lean()
        .exec();
    }

    static findInfoWithTextAndDraftTextById(id) {
        return BlogModel.findOne({_id: id, status: true})
        .select('+text +draftText +isSubmitted +isDraft +status')
        .populate('author', this.AUTHOR_DETAIL)
        .lean()
        .exec();
    }

    static findBlogAllDataById (id) {
        return BlogModel.findOne({_id: id, status: true})
        .select(this.BLOG_ALL_DATA)
        .populate('author', this.AUTHOR_DETAIL)
        .lean()
        .exec();
    }

    static findUrlIfExists (blogUrl) {
        return BlogModel.findOne({blogUrl: blogUrl}).lean().exec();
    }

    static findByTagAndPaginated (tag, pageNumber, limit) {
        return BlogModel.find({tag: tag, status : true, isPublished: true})
        .skip(limit * (pageNumber - 1))
        .limit(limit)
        .populate('author', this.AUTHOR_DETAIL)
        .sort({updatedAt: -1})
        .lean()
        .exec()
    }

    static findAllPublishedForAuthor(user) {
        return BlogModel.find({author: user, status: true, isPublished: true})
        .populate('author', this.AUTHOR_DETAIL)
        .sort({updatedAt : -1})
        .lean()
        .exec();
    }

    static findAllDrafts() {
        return this.findDetailedBlogs({isDraft: true.valueOf, status: true});
    }

     static findAllSubmissions()  {
    return this.findDetailedBlogs({ isSubmitted: true, status: true });
  }

   static findAllPublished() {
    return this.findDetailedBlogs({ isPublished: true, status: true });
  }

   static findAllSubmissionsForWriter(user){
    return this.findDetailedBlogs({ author: user, status: true, isSubmitted: true });
  }

   static findAllPublishedForWriter(user) {
    return this.findDetailedBlogs({ author: user, status: true, isPublished: true });
  }

   static findAllDraftsForWriter(user){
    return this.findDetailedBlogs({ author: user, status: true, isDraft: true });
  }

   static findDetailedBlogs(query) {
    return BlogModel.find(query)
      .select(this.BLOG_INFO_ADDITIONAL)
      .populate('author', this.AUTHOR_DETAIL)
      .populate('createdBy', this.AUTHOR_DETAIL)
      .populate('updatedBy', this.AUTHOR_DETAIL)
      .sort({ updatedAt: -1 })
      .lean()
      .exec();
  }

   static findLatestBlogs(pageNumber,  limit) {
    return BlogModel.find({ status: true, isPublished: true })
      .skip(limit * (pageNumber - 1))
      .limit(limit)
      .populate('author', this.AUTHOR_DETAIL)
      .sort({ publishedAt: -1 })
      .lean()
      .exec();
  }

   static searchSimilarBlogs(blog, limit) {
    return BlogModel.find(
      {
        $text: { $search: blog.title, $caseSensitive: false },
        status: true,
        isPublished: true,
        _id: { $ne: blog._id },
      },
      {
        similarity: { $meta: 'textScore' },
      },
    )
      .populate('author', this.AUTHOR_DETAIL)
      .sort({ updatedAt: -1 })
      .limit(limit)
      .sort({ similarity: { $meta: 'textScore' } })
      .lean()
      .exec();
  }

   static search(query, limit) {
    return BlogModel.find(
      {
        $text: { $search: query, $caseSensitive: false },
        status: true,
        isPublished: true,
      },
      {
        similarity: { $meta: 'textScore' },
      },
    )
      .select('-status -description')
      .limit(limit)
      .sort({ similarity: { $meta: 'textScore' } })
      .lean()
      .exec();
  }

   static searchLike(query, limit) {
    return BlogModel.find({
      title: { $regex: `.*${query}.*`, $options: 'i' },
      status: true,
      isPublished: true,
    })
      .select('-status -description')
      .limit(limit)
      .sort({ score: -1 })
      .lean()
      .exec();
  }
}

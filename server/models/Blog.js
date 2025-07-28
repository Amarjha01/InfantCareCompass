import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true,
    maxlength: 200
  },
  author: {
    name: { type: String, required: true },
    email: String,
    avatar: String
  },
  category: {
    type: String,
    required: true,
    enum: ['Child Development', 'Nutrition', 'Health & Safety', 'Parenting Tips', 'Education']
  },
  tags: [{
    type: String,
    enum: ['draft', 'featured', 'trending', 'popular', 'new', 'essential', 'beginner', 'advanced'],
    trim: true
  }],
  featuredImage: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'published'
  },
  readTime: {
    type: Number,
    default: 5
  },
  views: {
    type: Number,
    default: 0  
  },
  likes: {
    type: Number,
    default: 0  
  },
  publishedDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Auto-generate slug from title
blogSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
  next();
});

const blogModel=new mongoose.model('BlogData',blogSchema)
export default blogModel

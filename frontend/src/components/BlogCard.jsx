import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatDate } from '../lib/utils';
import { ArrowRight } from 'lucide-react';

const BlogCard = ({ post, index = 0, featured = false }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group ${featured ? 'md:col-span-2' : ''}`}
      data-testid={`blog-card-${post.slug}`}
    >
      <Link to={`/blog/${post.slug}`}>
        <div className={`card-hover bg-white rounded-xl overflow-hidden ${featured ? 'md:flex' : ''}`}>
          {/* Image */}
          <div className={`image-zoom ${featured ? 'md:w-1/2' : 'aspect-[16/10]'}`}>
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Content */}
          <div className={`p-6 ${featured ? 'md:w-1/2 md:p-8 flex flex-col justify-center' : ''}`}>
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.slice(0, 2).map((tag) => (
                <span 
                  key={tag}
                  className="font-body text-xs font-medium text-primary uppercase tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3 className={`font-heading font-semibold text-foreground mb-3 group-hover:text-primary transition-colors ${
              featured ? 'text-2xl md:text-3xl' : 'text-xl'
            }`}>
              {post.title}
            </h3>
            
            <p className={`font-body text-muted-foreground mb-4 ${featured ? 'text-base' : 'text-sm line-clamp-2'}`}>
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="font-body text-xs text-muted-foreground">
                <span>{post.author}</span>
                <span className="mx-2">•</span>
                <span>{formatDate(post.created_at)}</span>
              </div>
              <ArrowRight 
                size={18} 
                className="text-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all"
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default BlogCard;

const graphql = require('graphql');
const lodash = require('lodash');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const bookSchema = require('../models/book');
const authorSchema = require('../models/author');

// Manual data
var books = [
  {id: '1', name: "Book 1", genre: "Genre 1", authorId: "1"},
  {id: '2', name: "Book 2", genre: "Genre 2 Int", authorId: "2"},
  {id: '3', name: "Book 3", genre: "Genre 3", authorId: "3"},
  {id: '4', name: "Book 4", genre: "Genre 4", authorId: "3"},
  {id: '5', name: "Book 5", genre: "Genre 5", authorId: "3"},
  {id: '6', name: "Book 6", genre: "Genre 6", authorId: "1"}
]

var authors = [
  {id: '1', name: "Author 1", age: 11},
  {id: '2', name: "Author 2", age: 22},
  {id: '3', name: "Author 3", age: 33}
]

const BookQuery = new GraphQLObjectType({
  name: 'Books',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorQuery,
      resolve(parent, args) {
        // return lodash.find(authors, { id: parent.authorId })
        return authorSchema.findById(parent.authorId);
      }
    }
  })
});

const AuthorQuery = new GraphQLObjectType({
  name: 'Authors',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookQuery),
      resolve(parent, args) {
        // return lodash.filter(books, { authorId: parent.id })
        return bookSchema.find({
          authorId: parent.id
        })
      }
    }
  })
});

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookQuery,
      args: {id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        // return lodash.find(books, {id: args.id})
        return bookSchema.findById(args.id);
      }
    },
    author: {
      type: AuthorQuery,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        // return lodash.find(authors, { id: args.id })
        return authorSchema.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookQuery),
      resolve(parent, args) {
        // return books;
        return bookSchema.find({});
      }
    },
    authors: {
      type: new GraphQLList(AuthorQuery),
      resolve(parent, args) {
        // return authors;
        return authorSchema.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "mutation",
  fields: () => ({
    addAuthor: {
      type: AuthorQuery,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        let object = new authorSchema({
          name: args.name,
          age: args.age
        })
        return object.save();
      }
    },
    addBook: {
      type: BookQuery,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let object = new bookSchema({
          name: args.name,
          genre: args.genre,
          authorId: args.authId
        })
        return object.save();
      }
    }
  })
});

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: Mutation
});

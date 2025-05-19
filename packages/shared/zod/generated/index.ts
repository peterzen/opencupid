import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','tokenVersion','loginToken','loginTokenExp','isRegistrationConfirmed','isAccountDisabled','createdAt','updatedAt','lastLoginAt','searchPreferenceId']);

export const ProfileScalarFieldEnumSchema = z.enum(['id','publicName','intro','country','city','birthday','gender','relationship','hasKids','lookingFor','latitude','longitude','isActive','isReported','userId','primaryImageId','createdAt','updatedAt']);

export const ProfileImageScalarFieldEnumSchema = z.enum(['id','url','mimeType','size','profileId','createdAt','updatedAt']);

export const TagScalarFieldEnumSchema = z.enum(['id','name']);

export const ProfileTagScalarFieldEnumSchema = z.enum(['id','profileId','tagId']);

export const SearchPreferenceScalarFieldEnumSchema = z.enum(['id','profileId','ageMin','ageMax','gender','userId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const GenderSchema = z.enum(['male','female','non_binary','other','unspecified']);

export type GenderType = `${z.infer<typeof GenderSchema>}`

export const RelationshipStatusSchema = z.enum(['single','in_relationship','married','other','unspecified']);

export type RelationshipStatusType = `${z.infer<typeof RelationshipStatusSchema>}`

export const ConnectionTypeSchema = z.enum(['friends','relationship']);

export type ConnectionTypeType = `${z.infer<typeof ConnectionTypeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().cuid(),
  email: z.string(),
  tokenVersion: z.number().int(),
  loginToken: z.string().nullable(),
  loginTokenExp: z.coerce.date().nullable(),
  isRegistrationConfirmed: z.boolean(),
  isAccountDisabled: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  lastLoginAt: z.coerce.date().nullable(),
  searchPreferenceId: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// PROFILE SCHEMA
/////////////////////////////////////////

export const ProfileSchema = z.object({
  gender: GenderSchema,
  relationship: RelationshipStatusSchema,
  lookingFor: ConnectionTypeSchema.array(),
  id: z.string().cuid(),
  publicName: z.string(),
  intro: z.string(),
  country: z.string(),
  city: z.string(),
  birthday: z.coerce.date().nullable(),
  hasKids: z.boolean().nullable(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  isActive: z.boolean(),
  isReported: z.boolean(),
  userId: z.string(),
  primaryImageId: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Profile = z.infer<typeof ProfileSchema>

/////////////////////////////////////////
// PROFILE IMAGE SCHEMA
/////////////////////////////////////////

export const ProfileImageSchema = z.object({
  id: z.string().cuid(),
  url: z.string(),
  mimeType: z.string(),
  size: z.number().int(),
  profileId: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type ProfileImage = z.infer<typeof ProfileImageSchema>

/////////////////////////////////////////
// TAG SCHEMA
/////////////////////////////////////////

export const TagSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
})

export type Tag = z.infer<typeof TagSchema>

/////////////////////////////////////////
// PROFILE TAG SCHEMA
/////////////////////////////////////////

export const ProfileTagSchema = z.object({
  id: z.string().cuid(),
  profileId: z.string(),
  tagId: z.string(),
})

export type ProfileTag = z.infer<typeof ProfileTagSchema>

/////////////////////////////////////////
// SEARCH PREFERENCE SCHEMA
/////////////////////////////////////////

export const SearchPreferenceSchema = z.object({
  gender: GenderSchema,
  id: z.string().cuid(),
  profileId: z.string(),
  ageMin: z.number().int(),
  ageMax: z.number().int(),
  userId: z.string(),
})

export type SearchPreference = z.infer<typeof SearchPreferenceSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  profile: z.union([z.boolean(),z.lazy(() => ProfileArgsSchema)]).optional(),
  searchPreference: z.union([z.boolean(),z.lazy(() => SearchPreferenceArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  tokenVersion: z.boolean().optional(),
  loginToken: z.boolean().optional(),
  loginTokenExp: z.boolean().optional(),
  isRegistrationConfirmed: z.boolean().optional(),
  isAccountDisabled: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  lastLoginAt: z.boolean().optional(),
  searchPreferenceId: z.boolean().optional(),
  profile: z.union([z.boolean(),z.lazy(() => ProfileArgsSchema)]).optional(),
  searchPreference: z.union([z.boolean(),z.lazy(() => SearchPreferenceArgsSchema)]).optional(),
}).strict()

// PROFILE
//------------------------------------------------------

export const ProfileIncludeSchema: z.ZodType<Prisma.ProfileInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  images: z.union([z.boolean(),z.lazy(() => ProfileImageFindManyArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => ProfileTagFindManyArgsSchema)]).optional(),
  primaryImage: z.union([z.boolean(),z.lazy(() => ProfileImageArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProfileCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ProfileArgsSchema: z.ZodType<Prisma.ProfileDefaultArgs> = z.object({
  select: z.lazy(() => ProfileSelectSchema).optional(),
  include: z.lazy(() => ProfileIncludeSchema).optional(),
}).strict();

export const ProfileCountOutputTypeArgsSchema: z.ZodType<Prisma.ProfileCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ProfileCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ProfileCountOutputTypeSelectSchema: z.ZodType<Prisma.ProfileCountOutputTypeSelect> = z.object({
  images: z.boolean().optional(),
  tags: z.boolean().optional(),
}).strict();

export const ProfileSelectSchema: z.ZodType<Prisma.ProfileSelect> = z.object({
  id: z.boolean().optional(),
  publicName: z.boolean().optional(),
  intro: z.boolean().optional(),
  country: z.boolean().optional(),
  city: z.boolean().optional(),
  birthday: z.boolean().optional(),
  gender: z.boolean().optional(),
  relationship: z.boolean().optional(),
  hasKids: z.boolean().optional(),
  lookingFor: z.boolean().optional(),
  latitude: z.boolean().optional(),
  longitude: z.boolean().optional(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  userId: z.boolean().optional(),
  primaryImageId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  images: z.union([z.boolean(),z.lazy(() => ProfileImageFindManyArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => ProfileTagFindManyArgsSchema)]).optional(),
  primaryImage: z.union([z.boolean(),z.lazy(() => ProfileImageArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProfileCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PROFILE IMAGE
//------------------------------------------------------

export const ProfileImageIncludeSchema: z.ZodType<Prisma.ProfileImageInclude> = z.object({
  profile: z.union([z.boolean(),z.lazy(() => ProfileArgsSchema)]).optional(),
  primaryFor: z.union([z.boolean(),z.lazy(() => ProfileArgsSchema)]).optional(),
}).strict()

export const ProfileImageArgsSchema: z.ZodType<Prisma.ProfileImageDefaultArgs> = z.object({
  select: z.lazy(() => ProfileImageSelectSchema).optional(),
  include: z.lazy(() => ProfileImageIncludeSchema).optional(),
}).strict();

export const ProfileImageSelectSchema: z.ZodType<Prisma.ProfileImageSelect> = z.object({
  id: z.boolean().optional(),
  url: z.boolean().optional(),
  mimeType: z.boolean().optional(),
  size: z.boolean().optional(),
  profileId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  profile: z.union([z.boolean(),z.lazy(() => ProfileArgsSchema)]).optional(),
  primaryFor: z.union([z.boolean(),z.lazy(() => ProfileArgsSchema)]).optional(),
}).strict()

// TAG
//------------------------------------------------------

export const TagIncludeSchema: z.ZodType<Prisma.TagInclude> = z.object({
  profileLinks: z.union([z.boolean(),z.lazy(() => ProfileTagFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TagCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const TagArgsSchema: z.ZodType<Prisma.TagDefaultArgs> = z.object({
  select: z.lazy(() => TagSelectSchema).optional(),
  include: z.lazy(() => TagIncludeSchema).optional(),
}).strict();

export const TagCountOutputTypeArgsSchema: z.ZodType<Prisma.TagCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TagCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TagCountOutputTypeSelectSchema: z.ZodType<Prisma.TagCountOutputTypeSelect> = z.object({
  profileLinks: z.boolean().optional(),
}).strict();

export const TagSelectSchema: z.ZodType<Prisma.TagSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  profileLinks: z.union([z.boolean(),z.lazy(() => ProfileTagFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TagCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PROFILE TAG
//------------------------------------------------------

export const ProfileTagIncludeSchema: z.ZodType<Prisma.ProfileTagInclude> = z.object({
  profile: z.union([z.boolean(),z.lazy(() => ProfileArgsSchema)]).optional(),
  tag: z.union([z.boolean(),z.lazy(() => TagArgsSchema)]).optional(),
}).strict()

export const ProfileTagArgsSchema: z.ZodType<Prisma.ProfileTagDefaultArgs> = z.object({
  select: z.lazy(() => ProfileTagSelectSchema).optional(),
  include: z.lazy(() => ProfileTagIncludeSchema).optional(),
}).strict();

export const ProfileTagSelectSchema: z.ZodType<Prisma.ProfileTagSelect> = z.object({
  id: z.boolean().optional(),
  profileId: z.boolean().optional(),
  tagId: z.boolean().optional(),
  profile: z.union([z.boolean(),z.lazy(() => ProfileArgsSchema)]).optional(),
  tag: z.union([z.boolean(),z.lazy(() => TagArgsSchema)]).optional(),
}).strict()

// SEARCH PREFERENCE
//------------------------------------------------------

export const SearchPreferenceIncludeSchema: z.ZodType<Prisma.SearchPreferenceInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SearchPreferenceArgsSchema: z.ZodType<Prisma.SearchPreferenceDefaultArgs> = z.object({
  select: z.lazy(() => SearchPreferenceSelectSchema).optional(),
  include: z.lazy(() => SearchPreferenceIncludeSchema).optional(),
}).strict();

export const SearchPreferenceSelectSchema: z.ZodType<Prisma.SearchPreferenceSelect> = z.object({
  id: z.boolean().optional(),
  profileId: z.boolean().optional(),
  ageMin: z.boolean().optional(),
  ageMax: z.boolean().optional(),
  gender: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tokenVersion: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  loginToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  loginTokenExp: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  isRegistrationConfirmed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isAccountDisabled: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  lastLoginAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  searchPreferenceId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  profile: z.union([ z.lazy(() => ProfileNullableScalarRelationFilterSchema),z.lazy(() => ProfileWhereInputSchema) ]).optional().nullable(),
  searchPreference: z.union([ z.lazy(() => SearchPreferenceNullableScalarRelationFilterSchema),z.lazy(() => SearchPreferenceWhereInputSchema) ]).optional().nullable(),
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  tokenVersion: z.lazy(() => SortOrderSchema).optional(),
  loginToken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  loginTokenExp: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isRegistrationConfirmed: z.lazy(() => SortOrderSchema).optional(),
  isAccountDisabled: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  lastLoginAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  searchPreferenceId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  profile: z.lazy(() => ProfileOrderByWithRelationInputSchema).optional(),
  searchPreference: z.lazy(() => SearchPreferenceOrderByWithRelationInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    email: z.string(),
    loginToken: z.string()
  }),
  z.object({
    id: z.string().cuid(),
    email: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
    loginToken: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    email: z.string(),
    loginToken: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
  z.object({
    loginToken: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional(),
  loginToken: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  tokenVersion: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  loginTokenExp: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  isRegistrationConfirmed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isAccountDisabled: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  lastLoginAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  searchPreferenceId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  profile: z.union([ z.lazy(() => ProfileNullableScalarRelationFilterSchema),z.lazy(() => ProfileWhereInputSchema) ]).optional().nullable(),
  searchPreference: z.union([ z.lazy(() => SearchPreferenceNullableScalarRelationFilterSchema),z.lazy(() => SearchPreferenceWhereInputSchema) ]).optional().nullable(),
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  tokenVersion: z.lazy(() => SortOrderSchema).optional(),
  loginToken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  loginTokenExp: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isRegistrationConfirmed: z.lazy(() => SortOrderSchema).optional(),
  isAccountDisabled: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  lastLoginAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  searchPreferenceId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tokenVersion: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  loginToken: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  loginTokenExp: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  isRegistrationConfirmed: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  isAccountDisabled: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  lastLoginAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  searchPreferenceId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ProfileWhereInputSchema: z.ZodType<Prisma.ProfileWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProfileWhereInputSchema),z.lazy(() => ProfileWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfileWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfileWhereInputSchema),z.lazy(() => ProfileWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  publicName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  intro: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  country: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  birthday: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  gender: z.union([ z.lazy(() => EnumGenderFilterSchema),z.lazy(() => GenderSchema) ]).optional(),
  relationship: z.union([ z.lazy(() => EnumRelationshipStatusFilterSchema),z.lazy(() => RelationshipStatusSchema) ]).optional(),
  hasKids: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  lookingFor: z.lazy(() => EnumConnectionTypeNullableListFilterSchema).optional(),
  latitude: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  longitude: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isReported: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  primaryImageId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  images: z.lazy(() => ProfileImageListRelationFilterSchema).optional(),
  tags: z.lazy(() => ProfileTagListRelationFilterSchema).optional(),
  primaryImage: z.union([ z.lazy(() => ProfileImageNullableScalarRelationFilterSchema),z.lazy(() => ProfileImageWhereInputSchema) ]).optional().nullable(),
}).strict();

export const ProfileOrderByWithRelationInputSchema: z.ZodType<Prisma.ProfileOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  publicName: z.lazy(() => SortOrderSchema).optional(),
  intro: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  birthday: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  relationship: z.lazy(() => SortOrderSchema).optional(),
  hasKids: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  lookingFor: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  longitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  isReported: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  primaryImageId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  images: z.lazy(() => ProfileImageOrderByRelationAggregateInputSchema).optional(),
  tags: z.lazy(() => ProfileTagOrderByRelationAggregateInputSchema).optional(),
  primaryImage: z.lazy(() => ProfileImageOrderByWithRelationInputSchema).optional()
}).strict();

export const ProfileWhereUniqueInputSchema: z.ZodType<Prisma.ProfileWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    userId: z.string(),
    primaryImageId: z.string()
  }),
  z.object({
    id: z.string().cuid(),
    userId: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
    primaryImageId: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    userId: z.string(),
    primaryImageId: z.string(),
  }),
  z.object({
    userId: z.string(),
  }),
  z.object({
    primaryImageId: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  userId: z.string().optional(),
  primaryImageId: z.string().optional(),
  AND: z.union([ z.lazy(() => ProfileWhereInputSchema),z.lazy(() => ProfileWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfileWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfileWhereInputSchema),z.lazy(() => ProfileWhereInputSchema).array() ]).optional(),
  publicName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  intro: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  country: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  birthday: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  gender: z.union([ z.lazy(() => EnumGenderFilterSchema),z.lazy(() => GenderSchema) ]).optional(),
  relationship: z.union([ z.lazy(() => EnumRelationshipStatusFilterSchema),z.lazy(() => RelationshipStatusSchema) ]).optional(),
  hasKids: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  lookingFor: z.lazy(() => EnumConnectionTypeNullableListFilterSchema).optional(),
  latitude: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  longitude: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isReported: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  images: z.lazy(() => ProfileImageListRelationFilterSchema).optional(),
  tags: z.lazy(() => ProfileTagListRelationFilterSchema).optional(),
  primaryImage: z.union([ z.lazy(() => ProfileImageNullableScalarRelationFilterSchema),z.lazy(() => ProfileImageWhereInputSchema) ]).optional().nullable(),
}).strict());

export const ProfileOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProfileOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  publicName: z.lazy(() => SortOrderSchema).optional(),
  intro: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  birthday: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  relationship: z.lazy(() => SortOrderSchema).optional(),
  hasKids: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  lookingFor: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  longitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  isReported: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  primaryImageId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProfileCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ProfileAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProfileMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProfileMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ProfileSumOrderByAggregateInputSchema).optional()
}).strict();

export const ProfileScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProfileScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProfileScalarWhereWithAggregatesInputSchema),z.lazy(() => ProfileScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfileScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfileScalarWhereWithAggregatesInputSchema),z.lazy(() => ProfileScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  publicName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  intro: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  country: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  birthday: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  gender: z.union([ z.lazy(() => EnumGenderWithAggregatesFilterSchema),z.lazy(() => GenderSchema) ]).optional(),
  relationship: z.union([ z.lazy(() => EnumRelationshipStatusWithAggregatesFilterSchema),z.lazy(() => RelationshipStatusSchema) ]).optional(),
  hasKids: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  lookingFor: z.lazy(() => EnumConnectionTypeNullableListFilterSchema).optional(),
  latitude: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  longitude: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  isActive: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  isReported: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  primaryImageId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ProfileImageWhereInputSchema: z.ZodType<Prisma.ProfileImageWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProfileImageWhereInputSchema),z.lazy(() => ProfileImageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfileImageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfileImageWhereInputSchema),z.lazy(() => ProfileImageWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  mimeType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  size: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  profileId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  profile: z.union([ z.lazy(() => ProfileNullableScalarRelationFilterSchema),z.lazy(() => ProfileWhereInputSchema) ]).optional().nullable(),
  primaryFor: z.union([ z.lazy(() => ProfileNullableScalarRelationFilterSchema),z.lazy(() => ProfileWhereInputSchema) ]).optional().nullable(),
}).strict();

export const ProfileImageOrderByWithRelationInputSchema: z.ZodType<Prisma.ProfileImageOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  mimeType: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  profile: z.lazy(() => ProfileOrderByWithRelationInputSchema).optional(),
  primaryFor: z.lazy(() => ProfileOrderByWithRelationInputSchema).optional()
}).strict();

export const ProfileImageWhereUniqueInputSchema: z.ZodType<Prisma.ProfileImageWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => ProfileImageWhereInputSchema),z.lazy(() => ProfileImageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfileImageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfileImageWhereInputSchema),z.lazy(() => ProfileImageWhereInputSchema).array() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  mimeType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  size: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  profileId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  profile: z.union([ z.lazy(() => ProfileNullableScalarRelationFilterSchema),z.lazy(() => ProfileWhereInputSchema) ]).optional().nullable(),
  primaryFor: z.union([ z.lazy(() => ProfileNullableScalarRelationFilterSchema),z.lazy(() => ProfileWhereInputSchema) ]).optional().nullable(),
}).strict());

export const ProfileImageOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProfileImageOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  mimeType: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProfileImageCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ProfileImageAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProfileImageMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProfileImageMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ProfileImageSumOrderByAggregateInputSchema).optional()
}).strict();

export const ProfileImageScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProfileImageScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProfileImageScalarWhereWithAggregatesInputSchema),z.lazy(() => ProfileImageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfileImageScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfileImageScalarWhereWithAggregatesInputSchema),z.lazy(() => ProfileImageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  mimeType: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  size: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  profileId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TagWhereInputSchema: z.ZodType<Prisma.TagWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  profileLinks: z.lazy(() => ProfileTagListRelationFilterSchema).optional()
}).strict();

export const TagOrderByWithRelationInputSchema: z.ZodType<Prisma.TagOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  profileLinks: z.lazy(() => ProfileTagOrderByRelationAggregateInputSchema).optional()
}).strict();

export const TagWhereUniqueInputSchema: z.ZodType<Prisma.TagWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    name: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  profileLinks: z.lazy(() => ProfileTagListRelationFilterSchema).optional()
}).strict());

export const TagOrderByWithAggregationInputSchema: z.ZodType<Prisma.TagOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TagCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TagMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TagMinOrderByAggregateInputSchema).optional()
}).strict();

export const TagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TagScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TagScalarWhereWithAggregatesInputSchema),z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagScalarWhereWithAggregatesInputSchema),z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ProfileTagWhereInputSchema: z.ZodType<Prisma.ProfileTagWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProfileTagWhereInputSchema),z.lazy(() => ProfileTagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfileTagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfileTagWhereInputSchema),z.lazy(() => ProfileTagWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  profileId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tagId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  profile: z.union([ z.lazy(() => ProfileScalarRelationFilterSchema),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
  tag: z.union([ z.lazy(() => TagScalarRelationFilterSchema),z.lazy(() => TagWhereInputSchema) ]).optional(),
}).strict();

export const ProfileTagOrderByWithRelationInputSchema: z.ZodType<Prisma.ProfileTagOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional(),
  profile: z.lazy(() => ProfileOrderByWithRelationInputSchema).optional(),
  tag: z.lazy(() => TagOrderByWithRelationInputSchema).optional()
}).strict();

export const ProfileTagWhereUniqueInputSchema: z.ZodType<Prisma.ProfileTagWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    profileId_tagId: z.lazy(() => ProfileTagProfileIdTagIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    profileId_tagId: z.lazy(() => ProfileTagProfileIdTagIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  profileId_tagId: z.lazy(() => ProfileTagProfileIdTagIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => ProfileTagWhereInputSchema),z.lazy(() => ProfileTagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfileTagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfileTagWhereInputSchema),z.lazy(() => ProfileTagWhereInputSchema).array() ]).optional(),
  profileId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tagId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  profile: z.union([ z.lazy(() => ProfileScalarRelationFilterSchema),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
  tag: z.union([ z.lazy(() => TagScalarRelationFilterSchema),z.lazy(() => TagWhereInputSchema) ]).optional(),
}).strict());

export const ProfileTagOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProfileTagOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProfileTagCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProfileTagMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProfileTagMinOrderByAggregateInputSchema).optional()
}).strict();

export const ProfileTagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProfileTagScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProfileTagScalarWhereWithAggregatesInputSchema),z.lazy(() => ProfileTagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfileTagScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfileTagScalarWhereWithAggregatesInputSchema),z.lazy(() => ProfileTagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  profileId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tagId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const SearchPreferenceWhereInputSchema: z.ZodType<Prisma.SearchPreferenceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SearchPreferenceWhereInputSchema),z.lazy(() => SearchPreferenceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SearchPreferenceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SearchPreferenceWhereInputSchema),z.lazy(() => SearchPreferenceWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  profileId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ageMin: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  ageMax: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  gender: z.union([ z.lazy(() => EnumGenderFilterSchema),z.lazy(() => GenderSchema) ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SearchPreferenceOrderByWithRelationInputSchema: z.ZodType<Prisma.SearchPreferenceOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional(),
  ageMin: z.lazy(() => SortOrderSchema).optional(),
  ageMax: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SearchPreferenceWhereUniqueInputSchema: z.ZodType<Prisma.SearchPreferenceWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    profileId: z.string(),
    userId: z.string()
  }),
  z.object({
    id: z.string().cuid(),
    profileId: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
    userId: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    profileId: z.string(),
    userId: z.string(),
  }),
  z.object({
    profileId: z.string(),
  }),
  z.object({
    userId: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  profileId: z.string().optional(),
  userId: z.string().optional(),
  AND: z.union([ z.lazy(() => SearchPreferenceWhereInputSchema),z.lazy(() => SearchPreferenceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SearchPreferenceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SearchPreferenceWhereInputSchema),z.lazy(() => SearchPreferenceWhereInputSchema).array() ]).optional(),
  ageMin: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  ageMax: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  gender: z.union([ z.lazy(() => EnumGenderFilterSchema),z.lazy(() => GenderSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SearchPreferenceOrderByWithAggregationInputSchema: z.ZodType<Prisma.SearchPreferenceOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional(),
  ageMin: z.lazy(() => SortOrderSchema).optional(),
  ageMax: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SearchPreferenceCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SearchPreferenceAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SearchPreferenceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SearchPreferenceMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SearchPreferenceSumOrderByAggregateInputSchema).optional()
}).strict();

export const SearchPreferenceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SearchPreferenceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SearchPreferenceScalarWhereWithAggregatesInputSchema),z.lazy(() => SearchPreferenceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SearchPreferenceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SearchPreferenceScalarWhereWithAggregatesInputSchema),z.lazy(() => SearchPreferenceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  profileId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  ageMin: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  ageMax: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  gender: z.union([ z.lazy(() => EnumGenderWithAggregatesFilterSchema),z.lazy(() => GenderSchema) ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  tokenVersion: z.number().int().optional(),
  loginToken: z.string().optional().nullable(),
  loginTokenExp: z.coerce.date().optional().nullable(),
  isRegistrationConfirmed: z.boolean().optional(),
  isAccountDisabled: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lastLoginAt: z.coerce.date().optional().nullable(),
  searchPreferenceId: z.string().optional().nullable(),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutUserInputSchema).optional(),
  searchPreference: z.lazy(() => SearchPreferenceCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  tokenVersion: z.number().int().optional(),
  loginToken: z.string().optional().nullable(),
  loginTokenExp: z.coerce.date().optional().nullable(),
  isRegistrationConfirmed: z.boolean().optional(),
  isAccountDisabled: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lastLoginAt: z.coerce.date().optional().nullable(),
  searchPreferenceId: z.string().optional().nullable(),
  profile: z.lazy(() => ProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  searchPreference: z.lazy(() => SearchPreferenceUncheckedCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tokenVersion: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  loginToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  loginTokenExp: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isRegistrationConfirmed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isAccountDisabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastLoginAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  searchPreferenceId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profile: z.lazy(() => ProfileUpdateOneWithoutUserNestedInputSchema).optional(),
  searchPreference: z.lazy(() => SearchPreferenceUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tokenVersion: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  loginToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  loginTokenExp: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isRegistrationConfirmed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isAccountDisabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastLoginAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  searchPreferenceId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profile: z.lazy(() => ProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  searchPreference: z.lazy(() => SearchPreferenceUncheckedUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  tokenVersion: z.number().int().optional(),
  loginToken: z.string().optional().nullable(),
  loginTokenExp: z.coerce.date().optional().nullable(),
  isRegistrationConfirmed: z.boolean().optional(),
  isAccountDisabled: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lastLoginAt: z.coerce.date().optional().nullable(),
  searchPreferenceId: z.string().optional().nullable()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tokenVersion: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  loginToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  loginTokenExp: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isRegistrationConfirmed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isAccountDisabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastLoginAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  searchPreferenceId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tokenVersion: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  loginToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  loginTokenExp: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isRegistrationConfirmed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isAccountDisabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastLoginAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  searchPreferenceId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ProfileCreateInputSchema: z.ZodType<Prisma.ProfileCreateInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  intro: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  birthday: z.coerce.date().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional(),
  relationship: z.lazy(() => RelationshipStatusSchema).optional(),
  hasKids: z.boolean().optional().nullable(),
  lookingFor: z.union([ z.lazy(() => ProfileCreatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutProfileInputSchema),
  images: z.lazy(() => ProfileImageCreateNestedManyWithoutProfileInputSchema).optional(),
  tags: z.lazy(() => ProfileTagCreateNestedManyWithoutProfileInputSchema).optional(),
  primaryImage: z.lazy(() => ProfileImageCreateNestedOneWithoutPrimaryForInputSchema).optional()
}).strict();

export const ProfileUncheckedCreateInputSchema: z.ZodType<Prisma.ProfileUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  intro: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  birthday: z.coerce.date().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional(),
  relationship: z.lazy(() => RelationshipStatusSchema).optional(),
  hasKids: z.boolean().optional().nullable(),
  lookingFor: z.union([ z.lazy(() => ProfileCreatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  userId: z.string(),
  primaryImageId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  images: z.lazy(() => ProfileImageUncheckedCreateNestedManyWithoutProfileInputSchema).optional(),
  tags: z.lazy(() => ProfileTagUncheckedCreateNestedManyWithoutProfileInputSchema).optional()
}).strict();

export const ProfileUpdateInputSchema: z.ZodType<Prisma.ProfileUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  intro: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  relationship: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => EnumRelationshipStatusFieldUpdateOperationsInputSchema) ]).optional(),
  hasKids: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lookingFor: z.union([ z.lazy(() => ProfileUpdatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutProfileNestedInputSchema).optional(),
  images: z.lazy(() => ProfileImageUpdateManyWithoutProfileNestedInputSchema).optional(),
  tags: z.lazy(() => ProfileTagUpdateManyWithoutProfileNestedInputSchema).optional(),
  primaryImage: z.lazy(() => ProfileImageUpdateOneWithoutPrimaryForNestedInputSchema).optional()
}).strict();

export const ProfileUncheckedUpdateInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  intro: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  relationship: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => EnumRelationshipStatusFieldUpdateOperationsInputSchema) ]).optional(),
  hasKids: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lookingFor: z.union([ z.lazy(() => ProfileUpdatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  primaryImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.lazy(() => ProfileImageUncheckedUpdateManyWithoutProfileNestedInputSchema).optional(),
  tags: z.lazy(() => ProfileTagUncheckedUpdateManyWithoutProfileNestedInputSchema).optional()
}).strict();

export const ProfileCreateManyInputSchema: z.ZodType<Prisma.ProfileCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  intro: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  birthday: z.coerce.date().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional(),
  relationship: z.lazy(() => RelationshipStatusSchema).optional(),
  hasKids: z.boolean().optional().nullable(),
  lookingFor: z.union([ z.lazy(() => ProfileCreatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  userId: z.string(),
  primaryImageId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ProfileUpdateManyMutationInputSchema: z.ZodType<Prisma.ProfileUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  intro: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  relationship: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => EnumRelationshipStatusFieldUpdateOperationsInputSchema) ]).optional(),
  hasKids: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lookingFor: z.union([ z.lazy(() => ProfileUpdatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfileUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  intro: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  relationship: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => EnumRelationshipStatusFieldUpdateOperationsInputSchema) ]).optional(),
  hasKids: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lookingFor: z.union([ z.lazy(() => ProfileUpdatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  primaryImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfileImageCreateInputSchema: z.ZodType<Prisma.ProfileImageCreateInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  mimeType: z.string(),
  size: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutImagesInputSchema).optional(),
  primaryFor: z.lazy(() => ProfileCreateNestedOneWithoutPrimaryImageInputSchema).optional()
}).strict();

export const ProfileImageUncheckedCreateInputSchema: z.ZodType<Prisma.ProfileImageUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  mimeType: z.string(),
  size: z.number().int(),
  profileId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  primaryFor: z.lazy(() => ProfileUncheckedCreateNestedOneWithoutPrimaryImageInputSchema).optional()
}).strict();

export const ProfileImageUpdateInputSchema: z.ZodType<Prisma.ProfileImageUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  profile: z.lazy(() => ProfileUpdateOneWithoutImagesNestedInputSchema).optional(),
  primaryFor: z.lazy(() => ProfileUpdateOneWithoutPrimaryImageNestedInputSchema).optional()
}).strict();

export const ProfileImageUncheckedUpdateInputSchema: z.ZodType<Prisma.ProfileImageUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  primaryFor: z.lazy(() => ProfileUncheckedUpdateOneWithoutPrimaryImageNestedInputSchema).optional()
}).strict();

export const ProfileImageCreateManyInputSchema: z.ZodType<Prisma.ProfileImageCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  mimeType: z.string(),
  size: z.number().int(),
  profileId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ProfileImageUpdateManyMutationInputSchema: z.ZodType<Prisma.ProfileImageUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfileImageUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProfileImageUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagCreateInputSchema: z.ZodType<Prisma.TagCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  profileLinks: z.lazy(() => ProfileTagCreateNestedManyWithoutTagInputSchema).optional()
}).strict();

export const TagUncheckedCreateInputSchema: z.ZodType<Prisma.TagUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  profileLinks: z.lazy(() => ProfileTagUncheckedCreateNestedManyWithoutTagInputSchema).optional()
}).strict();

export const TagUpdateInputSchema: z.ZodType<Prisma.TagUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileLinks: z.lazy(() => ProfileTagUpdateManyWithoutTagNestedInputSchema).optional()
}).strict();

export const TagUncheckedUpdateInputSchema: z.ZodType<Prisma.TagUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileLinks: z.lazy(() => ProfileTagUncheckedUpdateManyWithoutTagNestedInputSchema).optional()
}).strict();

export const TagCreateManyInputSchema: z.ZodType<Prisma.TagCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string()
}).strict();

export const TagUpdateManyMutationInputSchema: z.ZodType<Prisma.TagUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfileTagCreateInputSchema: z.ZodType<Prisma.ProfileTagCreateInput> = z.object({
  id: z.string().cuid().optional(),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutTagsInputSchema),
  tag: z.lazy(() => TagCreateNestedOneWithoutProfileLinksInputSchema)
}).strict();

export const ProfileTagUncheckedCreateInputSchema: z.ZodType<Prisma.ProfileTagUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  profileId: z.string(),
  tagId: z.string()
}).strict();

export const ProfileTagUpdateInputSchema: z.ZodType<Prisma.ProfileTagUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profile: z.lazy(() => ProfileUpdateOneRequiredWithoutTagsNestedInputSchema).optional(),
  tag: z.lazy(() => TagUpdateOneRequiredWithoutProfileLinksNestedInputSchema).optional()
}).strict();

export const ProfileTagUncheckedUpdateInputSchema: z.ZodType<Prisma.ProfileTagUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfileTagCreateManyInputSchema: z.ZodType<Prisma.ProfileTagCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  profileId: z.string(),
  tagId: z.string()
}).strict();

export const ProfileTagUpdateManyMutationInputSchema: z.ZodType<Prisma.ProfileTagUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfileTagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProfileTagUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SearchPreferenceCreateInputSchema: z.ZodType<Prisma.SearchPreferenceCreateInput> = z.object({
  id: z.string().cuid().optional(),
  profileId: z.string(),
  ageMin: z.number().int(),
  ageMax: z.number().int(),
  gender: z.lazy(() => GenderSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutSearchPreferenceInputSchema)
}).strict();

export const SearchPreferenceUncheckedCreateInputSchema: z.ZodType<Prisma.SearchPreferenceUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  profileId: z.string(),
  ageMin: z.number().int(),
  ageMax: z.number().int(),
  gender: z.lazy(() => GenderSchema),
  userId: z.string()
}).strict();

export const SearchPreferenceUpdateInputSchema: z.ZodType<Prisma.SearchPreferenceUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ageMin: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ageMax: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSearchPreferenceNestedInputSchema).optional()
}).strict();

export const SearchPreferenceUncheckedUpdateInputSchema: z.ZodType<Prisma.SearchPreferenceUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ageMin: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ageMax: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SearchPreferenceCreateManyInputSchema: z.ZodType<Prisma.SearchPreferenceCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  profileId: z.string(),
  ageMin: z.number().int(),
  ageMax: z.number().int(),
  gender: z.lazy(() => GenderSchema),
  userId: z.string()
}).strict();

export const SearchPreferenceUpdateManyMutationInputSchema: z.ZodType<Prisma.SearchPreferenceUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ageMin: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ageMax: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SearchPreferenceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SearchPreferenceUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ageMin: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ageMax: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const ProfileNullableScalarRelationFilterSchema: z.ZodType<Prisma.ProfileNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => ProfileWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ProfileWhereInputSchema).optional().nullable()
}).strict();

export const SearchPreferenceNullableScalarRelationFilterSchema: z.ZodType<Prisma.SearchPreferenceNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => SearchPreferenceWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => SearchPreferenceWhereInputSchema).optional().nullable()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  tokenVersion: z.lazy(() => SortOrderSchema).optional(),
  loginToken: z.lazy(() => SortOrderSchema).optional(),
  loginTokenExp: z.lazy(() => SortOrderSchema).optional(),
  isRegistrationConfirmed: z.lazy(() => SortOrderSchema).optional(),
  isAccountDisabled: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  lastLoginAt: z.lazy(() => SortOrderSchema).optional(),
  searchPreferenceId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> = z.object({
  tokenVersion: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  tokenVersion: z.lazy(() => SortOrderSchema).optional(),
  loginToken: z.lazy(() => SortOrderSchema).optional(),
  loginTokenExp: z.lazy(() => SortOrderSchema).optional(),
  isRegistrationConfirmed: z.lazy(() => SortOrderSchema).optional(),
  isAccountDisabled: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  lastLoginAt: z.lazy(() => SortOrderSchema).optional(),
  searchPreferenceId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  tokenVersion: z.lazy(() => SortOrderSchema).optional(),
  loginToken: z.lazy(() => SortOrderSchema).optional(),
  loginTokenExp: z.lazy(() => SortOrderSchema).optional(),
  isRegistrationConfirmed: z.lazy(() => SortOrderSchema).optional(),
  isAccountDisabled: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  lastLoginAt: z.lazy(() => SortOrderSchema).optional(),
  searchPreferenceId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> = z.object({
  tokenVersion: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const EnumGenderFilterSchema: z.ZodType<Prisma.EnumGenderFilter> = z.object({
  equals: z.lazy(() => GenderSchema).optional(),
  in: z.lazy(() => GenderSchema).array().optional(),
  notIn: z.lazy(() => GenderSchema).array().optional(),
  not: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NestedEnumGenderFilterSchema) ]).optional(),
}).strict();

export const EnumRelationshipStatusFilterSchema: z.ZodType<Prisma.EnumRelationshipStatusFilter> = z.object({
  equals: z.lazy(() => RelationshipStatusSchema).optional(),
  in: z.lazy(() => RelationshipStatusSchema).array().optional(),
  notIn: z.lazy(() => RelationshipStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => NestedEnumRelationshipStatusFilterSchema) ]).optional(),
}).strict();

export const BoolNullableFilterSchema: z.ZodType<Prisma.BoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const EnumConnectionTypeNullableListFilterSchema: z.ZodType<Prisma.EnumConnectionTypeNullableListFilter> = z.object({
  equals: z.lazy(() => ConnectionTypeSchema).array().optional().nullable(),
  has: z.lazy(() => ConnectionTypeSchema).optional().nullable(),
  hasEvery: z.lazy(() => ConnectionTypeSchema).array().optional(),
  hasSome: z.lazy(() => ConnectionTypeSchema).array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const FloatNullableFilterSchema: z.ZodType<Prisma.FloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const ProfileImageListRelationFilterSchema: z.ZodType<Prisma.ProfileImageListRelationFilter> = z.object({
  every: z.lazy(() => ProfileImageWhereInputSchema).optional(),
  some: z.lazy(() => ProfileImageWhereInputSchema).optional(),
  none: z.lazy(() => ProfileImageWhereInputSchema).optional()
}).strict();

export const ProfileTagListRelationFilterSchema: z.ZodType<Prisma.ProfileTagListRelationFilter> = z.object({
  every: z.lazy(() => ProfileTagWhereInputSchema).optional(),
  some: z.lazy(() => ProfileTagWhereInputSchema).optional(),
  none: z.lazy(() => ProfileTagWhereInputSchema).optional()
}).strict();

export const ProfileImageNullableScalarRelationFilterSchema: z.ZodType<Prisma.ProfileImageNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => ProfileImageWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ProfileImageWhereInputSchema).optional().nullable()
}).strict();

export const ProfileImageOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ProfileImageOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileTagOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ProfileTagOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  publicName: z.lazy(() => SortOrderSchema).optional(),
  intro: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  birthday: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  relationship: z.lazy(() => SortOrderSchema).optional(),
  hasKids: z.lazy(() => SortOrderSchema).optional(),
  lookingFor: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  isReported: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  primaryImageId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileAvgOrderByAggregateInput> = z.object({
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  publicName: z.lazy(() => SortOrderSchema).optional(),
  intro: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  birthday: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  relationship: z.lazy(() => SortOrderSchema).optional(),
  hasKids: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  isReported: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  primaryImageId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  publicName: z.lazy(() => SortOrderSchema).optional(),
  intro: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  birthday: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  relationship: z.lazy(() => SortOrderSchema).optional(),
  hasKids: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  isReported: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  primaryImageId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileSumOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileSumOrderByAggregateInput> = z.object({
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumGenderWithAggregatesFilterSchema: z.ZodType<Prisma.EnumGenderWithAggregatesFilter> = z.object({
  equals: z.lazy(() => GenderSchema).optional(),
  in: z.lazy(() => GenderSchema).array().optional(),
  notIn: z.lazy(() => GenderSchema).array().optional(),
  not: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NestedEnumGenderWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumGenderFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumGenderFilterSchema).optional()
}).strict();

export const EnumRelationshipStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRelationshipStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RelationshipStatusSchema).optional(),
  in: z.lazy(() => RelationshipStatusSchema).array().optional(),
  notIn: z.lazy(() => RelationshipStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => NestedEnumRelationshipStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRelationshipStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRelationshipStatusFilterSchema).optional()
}).strict();

export const BoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
}).strict();

export const FloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.FloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const ProfileImageCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileImageCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  mimeType: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileImageAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileImageAvgOrderByAggregateInput> = z.object({
  size: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileImageMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileImageMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  mimeType: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileImageMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileImageMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  mimeType: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileImageSumOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileImageSumOrderByAggregateInput> = z.object({
  size: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagCountOrderByAggregateInputSchema: z.ZodType<Prisma.TagCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TagMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagMinOrderByAggregateInputSchema: z.ZodType<Prisma.TagMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileScalarRelationFilterSchema: z.ZodType<Prisma.ProfileScalarRelationFilter> = z.object({
  is: z.lazy(() => ProfileWhereInputSchema).optional(),
  isNot: z.lazy(() => ProfileWhereInputSchema).optional()
}).strict();

export const TagScalarRelationFilterSchema: z.ZodType<Prisma.TagScalarRelationFilter> = z.object({
  is: z.lazy(() => TagWhereInputSchema).optional(),
  isNot: z.lazy(() => TagWhereInputSchema).optional()
}).strict();

export const ProfileTagProfileIdTagIdCompoundUniqueInputSchema: z.ZodType<Prisma.ProfileTagProfileIdTagIdCompoundUniqueInput> = z.object({
  profileId: z.string(),
  tagId: z.string()
}).strict();

export const ProfileTagCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileTagCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileTagMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileTagMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileTagMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileTagMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SearchPreferenceCountOrderByAggregateInputSchema: z.ZodType<Prisma.SearchPreferenceCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional(),
  ageMin: z.lazy(() => SortOrderSchema).optional(),
  ageMax: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SearchPreferenceAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SearchPreferenceAvgOrderByAggregateInput> = z.object({
  ageMin: z.lazy(() => SortOrderSchema).optional(),
  ageMax: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SearchPreferenceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SearchPreferenceMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional(),
  ageMin: z.lazy(() => SortOrderSchema).optional(),
  ageMax: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SearchPreferenceMinOrderByAggregateInputSchema: z.ZodType<Prisma.SearchPreferenceMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional(),
  ageMin: z.lazy(() => SortOrderSchema).optional(),
  ageMax: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SearchPreferenceSumOrderByAggregateInputSchema: z.ZodType<Prisma.SearchPreferenceSumOrderByAggregateInput> = z.object({
  ageMin: z.lazy(() => SortOrderSchema).optional(),
  ageMax: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.ProfileCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutUserInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional()
}).strict();

export const SearchPreferenceCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.SearchPreferenceCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SearchPreferenceCreateWithoutUserInputSchema),z.lazy(() => SearchPreferenceUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SearchPreferenceCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => SearchPreferenceWhereUniqueInputSchema).optional()
}).strict();

export const ProfileUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.ProfileUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutUserInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional()
}).strict();

export const SearchPreferenceUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.SearchPreferenceUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SearchPreferenceCreateWithoutUserInputSchema),z.lazy(() => SearchPreferenceUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SearchPreferenceCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => SearchPreferenceWhereUniqueInputSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const ProfileUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.ProfileUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutUserInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => ProfileUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProfileUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => ProfileUpdateWithoutUserInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const SearchPreferenceUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.SearchPreferenceUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SearchPreferenceCreateWithoutUserInputSchema),z.lazy(() => SearchPreferenceUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SearchPreferenceCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => SearchPreferenceUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => SearchPreferenceWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => SearchPreferenceWhereInputSchema) ]).optional(),
  connect: z.lazy(() => SearchPreferenceWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SearchPreferenceUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => SearchPreferenceUpdateWithoutUserInputSchema),z.lazy(() => SearchPreferenceUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const ProfileUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutUserInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => ProfileUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProfileUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => ProfileUpdateWithoutUserInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const SearchPreferenceUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.SearchPreferenceUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SearchPreferenceCreateWithoutUserInputSchema),z.lazy(() => SearchPreferenceUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SearchPreferenceCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => SearchPreferenceUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => SearchPreferenceWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => SearchPreferenceWhereInputSchema) ]).optional(),
  connect: z.lazy(() => SearchPreferenceWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SearchPreferenceUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => SearchPreferenceUpdateWithoutUserInputSchema),z.lazy(() => SearchPreferenceUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const ProfileCreatelookingForInputSchema: z.ZodType<Prisma.ProfileCreatelookingForInput> = z.object({
  set: z.lazy(() => ConnectionTypeSchema).array()
}).strict();

export const UserCreateNestedOneWithoutProfileInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutProfileInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutProfileInputSchema),z.lazy(() => UserUncheckedCreateWithoutProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProfileInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const ProfileImageCreateNestedManyWithoutProfileInputSchema: z.ZodType<Prisma.ProfileImageCreateNestedManyWithoutProfileInput> = z.object({
  create: z.union([ z.lazy(() => ProfileImageCreateWithoutProfileInputSchema),z.lazy(() => ProfileImageCreateWithoutProfileInputSchema).array(),z.lazy(() => ProfileImageUncheckedCreateWithoutProfileInputSchema),z.lazy(() => ProfileImageUncheckedCreateWithoutProfileInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfileImageCreateOrConnectWithoutProfileInputSchema),z.lazy(() => ProfileImageCreateOrConnectWithoutProfileInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProfileImageCreateManyProfileInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProfileImageWhereUniqueInputSchema),z.lazy(() => ProfileImageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProfileTagCreateNestedManyWithoutProfileInputSchema: z.ZodType<Prisma.ProfileTagCreateNestedManyWithoutProfileInput> = z.object({
  create: z.union([ z.lazy(() => ProfileTagCreateWithoutProfileInputSchema),z.lazy(() => ProfileTagCreateWithoutProfileInputSchema).array(),z.lazy(() => ProfileTagUncheckedCreateWithoutProfileInputSchema),z.lazy(() => ProfileTagUncheckedCreateWithoutProfileInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfileTagCreateOrConnectWithoutProfileInputSchema),z.lazy(() => ProfileTagCreateOrConnectWithoutProfileInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProfileTagCreateManyProfileInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProfileTagWhereUniqueInputSchema),z.lazy(() => ProfileTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProfileImageCreateNestedOneWithoutPrimaryForInputSchema: z.ZodType<Prisma.ProfileImageCreateNestedOneWithoutPrimaryForInput> = z.object({
  create: z.union([ z.lazy(() => ProfileImageCreateWithoutPrimaryForInputSchema),z.lazy(() => ProfileImageUncheckedCreateWithoutPrimaryForInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileImageCreateOrConnectWithoutPrimaryForInputSchema).optional(),
  connect: z.lazy(() => ProfileImageWhereUniqueInputSchema).optional()
}).strict();

export const ProfileImageUncheckedCreateNestedManyWithoutProfileInputSchema: z.ZodType<Prisma.ProfileImageUncheckedCreateNestedManyWithoutProfileInput> = z.object({
  create: z.union([ z.lazy(() => ProfileImageCreateWithoutProfileInputSchema),z.lazy(() => ProfileImageCreateWithoutProfileInputSchema).array(),z.lazy(() => ProfileImageUncheckedCreateWithoutProfileInputSchema),z.lazy(() => ProfileImageUncheckedCreateWithoutProfileInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfileImageCreateOrConnectWithoutProfileInputSchema),z.lazy(() => ProfileImageCreateOrConnectWithoutProfileInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProfileImageCreateManyProfileInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProfileImageWhereUniqueInputSchema),z.lazy(() => ProfileImageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProfileTagUncheckedCreateNestedManyWithoutProfileInputSchema: z.ZodType<Prisma.ProfileTagUncheckedCreateNestedManyWithoutProfileInput> = z.object({
  create: z.union([ z.lazy(() => ProfileTagCreateWithoutProfileInputSchema),z.lazy(() => ProfileTagCreateWithoutProfileInputSchema).array(),z.lazy(() => ProfileTagUncheckedCreateWithoutProfileInputSchema),z.lazy(() => ProfileTagUncheckedCreateWithoutProfileInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfileTagCreateOrConnectWithoutProfileInputSchema),z.lazy(() => ProfileTagCreateOrConnectWithoutProfileInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProfileTagCreateManyProfileInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProfileTagWhereUniqueInputSchema),z.lazy(() => ProfileTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumGenderFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumGenderFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => GenderSchema).optional()
}).strict();

export const EnumRelationshipStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRelationshipStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => RelationshipStatusSchema).optional()
}).strict();

export const NullableBoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional().nullable()
}).strict();

export const ProfileUpdatelookingForInputSchema: z.ZodType<Prisma.ProfileUpdatelookingForInput> = z.object({
  set: z.lazy(() => ConnectionTypeSchema).array().optional(),
  push: z.union([ z.lazy(() => ConnectionTypeSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
}).strict();

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateOneRequiredWithoutProfileNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutProfileNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutProfileInputSchema),z.lazy(() => UserUncheckedCreateWithoutProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProfileInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutProfileInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutProfileInputSchema),z.lazy(() => UserUpdateWithoutProfileInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProfileInputSchema) ]).optional(),
}).strict();

export const ProfileImageUpdateManyWithoutProfileNestedInputSchema: z.ZodType<Prisma.ProfileImageUpdateManyWithoutProfileNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfileImageCreateWithoutProfileInputSchema),z.lazy(() => ProfileImageCreateWithoutProfileInputSchema).array(),z.lazy(() => ProfileImageUncheckedCreateWithoutProfileInputSchema),z.lazy(() => ProfileImageUncheckedCreateWithoutProfileInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfileImageCreateOrConnectWithoutProfileInputSchema),z.lazy(() => ProfileImageCreateOrConnectWithoutProfileInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProfileImageUpsertWithWhereUniqueWithoutProfileInputSchema),z.lazy(() => ProfileImageUpsertWithWhereUniqueWithoutProfileInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProfileImageCreateManyProfileInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProfileImageWhereUniqueInputSchema),z.lazy(() => ProfileImageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProfileImageWhereUniqueInputSchema),z.lazy(() => ProfileImageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProfileImageWhereUniqueInputSchema),z.lazy(() => ProfileImageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProfileImageWhereUniqueInputSchema),z.lazy(() => ProfileImageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProfileImageUpdateWithWhereUniqueWithoutProfileInputSchema),z.lazy(() => ProfileImageUpdateWithWhereUniqueWithoutProfileInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProfileImageUpdateManyWithWhereWithoutProfileInputSchema),z.lazy(() => ProfileImageUpdateManyWithWhereWithoutProfileInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProfileImageScalarWhereInputSchema),z.lazy(() => ProfileImageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProfileTagUpdateManyWithoutProfileNestedInputSchema: z.ZodType<Prisma.ProfileTagUpdateManyWithoutProfileNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfileTagCreateWithoutProfileInputSchema),z.lazy(() => ProfileTagCreateWithoutProfileInputSchema).array(),z.lazy(() => ProfileTagUncheckedCreateWithoutProfileInputSchema),z.lazy(() => ProfileTagUncheckedCreateWithoutProfileInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfileTagCreateOrConnectWithoutProfileInputSchema),z.lazy(() => ProfileTagCreateOrConnectWithoutProfileInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProfileTagUpsertWithWhereUniqueWithoutProfileInputSchema),z.lazy(() => ProfileTagUpsertWithWhereUniqueWithoutProfileInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProfileTagCreateManyProfileInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProfileTagWhereUniqueInputSchema),z.lazy(() => ProfileTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProfileTagWhereUniqueInputSchema),z.lazy(() => ProfileTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProfileTagWhereUniqueInputSchema),z.lazy(() => ProfileTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProfileTagWhereUniqueInputSchema),z.lazy(() => ProfileTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProfileTagUpdateWithWhereUniqueWithoutProfileInputSchema),z.lazy(() => ProfileTagUpdateWithWhereUniqueWithoutProfileInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProfileTagUpdateManyWithWhereWithoutProfileInputSchema),z.lazy(() => ProfileTagUpdateManyWithWhereWithoutProfileInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProfileTagScalarWhereInputSchema),z.lazy(() => ProfileTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProfileImageUpdateOneWithoutPrimaryForNestedInputSchema: z.ZodType<Prisma.ProfileImageUpdateOneWithoutPrimaryForNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfileImageCreateWithoutPrimaryForInputSchema),z.lazy(() => ProfileImageUncheckedCreateWithoutPrimaryForInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileImageCreateOrConnectWithoutPrimaryForInputSchema).optional(),
  upsert: z.lazy(() => ProfileImageUpsertWithoutPrimaryForInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ProfileImageWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ProfileImageWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ProfileImageWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProfileImageUpdateToOneWithWhereWithoutPrimaryForInputSchema),z.lazy(() => ProfileImageUpdateWithoutPrimaryForInputSchema),z.lazy(() => ProfileImageUncheckedUpdateWithoutPrimaryForInputSchema) ]).optional(),
}).strict();

export const ProfileImageUncheckedUpdateManyWithoutProfileNestedInputSchema: z.ZodType<Prisma.ProfileImageUncheckedUpdateManyWithoutProfileNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfileImageCreateWithoutProfileInputSchema),z.lazy(() => ProfileImageCreateWithoutProfileInputSchema).array(),z.lazy(() => ProfileImageUncheckedCreateWithoutProfileInputSchema),z.lazy(() => ProfileImageUncheckedCreateWithoutProfileInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfileImageCreateOrConnectWithoutProfileInputSchema),z.lazy(() => ProfileImageCreateOrConnectWithoutProfileInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProfileImageUpsertWithWhereUniqueWithoutProfileInputSchema),z.lazy(() => ProfileImageUpsertWithWhereUniqueWithoutProfileInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProfileImageCreateManyProfileInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProfileImageWhereUniqueInputSchema),z.lazy(() => ProfileImageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProfileImageWhereUniqueInputSchema),z.lazy(() => ProfileImageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProfileImageWhereUniqueInputSchema),z.lazy(() => ProfileImageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProfileImageWhereUniqueInputSchema),z.lazy(() => ProfileImageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProfileImageUpdateWithWhereUniqueWithoutProfileInputSchema),z.lazy(() => ProfileImageUpdateWithWhereUniqueWithoutProfileInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProfileImageUpdateManyWithWhereWithoutProfileInputSchema),z.lazy(() => ProfileImageUpdateManyWithWhereWithoutProfileInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProfileImageScalarWhereInputSchema),z.lazy(() => ProfileImageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProfileTagUncheckedUpdateManyWithoutProfileNestedInputSchema: z.ZodType<Prisma.ProfileTagUncheckedUpdateManyWithoutProfileNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfileTagCreateWithoutProfileInputSchema),z.lazy(() => ProfileTagCreateWithoutProfileInputSchema).array(),z.lazy(() => ProfileTagUncheckedCreateWithoutProfileInputSchema),z.lazy(() => ProfileTagUncheckedCreateWithoutProfileInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfileTagCreateOrConnectWithoutProfileInputSchema),z.lazy(() => ProfileTagCreateOrConnectWithoutProfileInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProfileTagUpsertWithWhereUniqueWithoutProfileInputSchema),z.lazy(() => ProfileTagUpsertWithWhereUniqueWithoutProfileInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProfileTagCreateManyProfileInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProfileTagWhereUniqueInputSchema),z.lazy(() => ProfileTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProfileTagWhereUniqueInputSchema),z.lazy(() => ProfileTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProfileTagWhereUniqueInputSchema),z.lazy(() => ProfileTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProfileTagWhereUniqueInputSchema),z.lazy(() => ProfileTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProfileTagUpdateWithWhereUniqueWithoutProfileInputSchema),z.lazy(() => ProfileTagUpdateWithWhereUniqueWithoutProfileInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProfileTagUpdateManyWithWhereWithoutProfileInputSchema),z.lazy(() => ProfileTagUpdateManyWithWhereWithoutProfileInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProfileTagScalarWhereInputSchema),z.lazy(() => ProfileTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProfileCreateNestedOneWithoutImagesInputSchema: z.ZodType<Prisma.ProfileCreateNestedOneWithoutImagesInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutImagesInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutImagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutImagesInputSchema).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional()
}).strict();

export const ProfileCreateNestedOneWithoutPrimaryImageInputSchema: z.ZodType<Prisma.ProfileCreateNestedOneWithoutPrimaryImageInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutPrimaryImageInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutPrimaryImageInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutPrimaryImageInputSchema).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional()
}).strict();

export const ProfileUncheckedCreateNestedOneWithoutPrimaryImageInputSchema: z.ZodType<Prisma.ProfileUncheckedCreateNestedOneWithoutPrimaryImageInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutPrimaryImageInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutPrimaryImageInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutPrimaryImageInputSchema).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional()
}).strict();

export const ProfileUpdateOneWithoutImagesNestedInputSchema: z.ZodType<Prisma.ProfileUpdateOneWithoutImagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutImagesInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutImagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutImagesInputSchema).optional(),
  upsert: z.lazy(() => ProfileUpsertWithoutImagesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProfileUpdateToOneWithWhereWithoutImagesInputSchema),z.lazy(() => ProfileUpdateWithoutImagesInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutImagesInputSchema) ]).optional(),
}).strict();

export const ProfileUpdateOneWithoutPrimaryImageNestedInputSchema: z.ZodType<Prisma.ProfileUpdateOneWithoutPrimaryImageNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutPrimaryImageInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutPrimaryImageInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutPrimaryImageInputSchema).optional(),
  upsert: z.lazy(() => ProfileUpsertWithoutPrimaryImageInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProfileUpdateToOneWithWhereWithoutPrimaryImageInputSchema),z.lazy(() => ProfileUpdateWithoutPrimaryImageInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutPrimaryImageInputSchema) ]).optional(),
}).strict();

export const ProfileUncheckedUpdateOneWithoutPrimaryImageNestedInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateOneWithoutPrimaryImageNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutPrimaryImageInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutPrimaryImageInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutPrimaryImageInputSchema).optional(),
  upsert: z.lazy(() => ProfileUpsertWithoutPrimaryImageInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProfileUpdateToOneWithWhereWithoutPrimaryImageInputSchema),z.lazy(() => ProfileUpdateWithoutPrimaryImageInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutPrimaryImageInputSchema) ]).optional(),
}).strict();

export const ProfileTagCreateNestedManyWithoutTagInputSchema: z.ZodType<Prisma.ProfileTagCreateNestedManyWithoutTagInput> = z.object({
  create: z.union([ z.lazy(() => ProfileTagCreateWithoutTagInputSchema),z.lazy(() => ProfileTagCreateWithoutTagInputSchema).array(),z.lazy(() => ProfileTagUncheckedCreateWithoutTagInputSchema),z.lazy(() => ProfileTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfileTagCreateOrConnectWithoutTagInputSchema),z.lazy(() => ProfileTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProfileTagCreateManyTagInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProfileTagWhereUniqueInputSchema),z.lazy(() => ProfileTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProfileTagUncheckedCreateNestedManyWithoutTagInputSchema: z.ZodType<Prisma.ProfileTagUncheckedCreateNestedManyWithoutTagInput> = z.object({
  create: z.union([ z.lazy(() => ProfileTagCreateWithoutTagInputSchema),z.lazy(() => ProfileTagCreateWithoutTagInputSchema).array(),z.lazy(() => ProfileTagUncheckedCreateWithoutTagInputSchema),z.lazy(() => ProfileTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfileTagCreateOrConnectWithoutTagInputSchema),z.lazy(() => ProfileTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProfileTagCreateManyTagInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProfileTagWhereUniqueInputSchema),z.lazy(() => ProfileTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProfileTagUpdateManyWithoutTagNestedInputSchema: z.ZodType<Prisma.ProfileTagUpdateManyWithoutTagNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfileTagCreateWithoutTagInputSchema),z.lazy(() => ProfileTagCreateWithoutTagInputSchema).array(),z.lazy(() => ProfileTagUncheckedCreateWithoutTagInputSchema),z.lazy(() => ProfileTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfileTagCreateOrConnectWithoutTagInputSchema),z.lazy(() => ProfileTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProfileTagUpsertWithWhereUniqueWithoutTagInputSchema),z.lazy(() => ProfileTagUpsertWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProfileTagCreateManyTagInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProfileTagWhereUniqueInputSchema),z.lazy(() => ProfileTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProfileTagWhereUniqueInputSchema),z.lazy(() => ProfileTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProfileTagWhereUniqueInputSchema),z.lazy(() => ProfileTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProfileTagWhereUniqueInputSchema),z.lazy(() => ProfileTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProfileTagUpdateWithWhereUniqueWithoutTagInputSchema),z.lazy(() => ProfileTagUpdateWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProfileTagUpdateManyWithWhereWithoutTagInputSchema),z.lazy(() => ProfileTagUpdateManyWithWhereWithoutTagInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProfileTagScalarWhereInputSchema),z.lazy(() => ProfileTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProfileTagUncheckedUpdateManyWithoutTagNestedInputSchema: z.ZodType<Prisma.ProfileTagUncheckedUpdateManyWithoutTagNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfileTagCreateWithoutTagInputSchema),z.lazy(() => ProfileTagCreateWithoutTagInputSchema).array(),z.lazy(() => ProfileTagUncheckedCreateWithoutTagInputSchema),z.lazy(() => ProfileTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfileTagCreateOrConnectWithoutTagInputSchema),z.lazy(() => ProfileTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProfileTagUpsertWithWhereUniqueWithoutTagInputSchema),z.lazy(() => ProfileTagUpsertWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProfileTagCreateManyTagInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProfileTagWhereUniqueInputSchema),z.lazy(() => ProfileTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProfileTagWhereUniqueInputSchema),z.lazy(() => ProfileTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProfileTagWhereUniqueInputSchema),z.lazy(() => ProfileTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProfileTagWhereUniqueInputSchema),z.lazy(() => ProfileTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProfileTagUpdateWithWhereUniqueWithoutTagInputSchema),z.lazy(() => ProfileTagUpdateWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProfileTagUpdateManyWithWhereWithoutTagInputSchema),z.lazy(() => ProfileTagUpdateManyWithWhereWithoutTagInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProfileTagScalarWhereInputSchema),z.lazy(() => ProfileTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProfileCreateNestedOneWithoutTagsInputSchema: z.ZodType<Prisma.ProfileCreateNestedOneWithoutTagsInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutTagsInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutTagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutTagsInputSchema).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional()
}).strict();

export const TagCreateNestedOneWithoutProfileLinksInputSchema: z.ZodType<Prisma.TagCreateNestedOneWithoutProfileLinksInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutProfileLinksInputSchema),z.lazy(() => TagUncheckedCreateWithoutProfileLinksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TagCreateOrConnectWithoutProfileLinksInputSchema).optional(),
  connect: z.lazy(() => TagWhereUniqueInputSchema).optional()
}).strict();

export const ProfileUpdateOneRequiredWithoutTagsNestedInputSchema: z.ZodType<Prisma.ProfileUpdateOneRequiredWithoutTagsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutTagsInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutTagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutTagsInputSchema).optional(),
  upsert: z.lazy(() => ProfileUpsertWithoutTagsInputSchema).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProfileUpdateToOneWithWhereWithoutTagsInputSchema),z.lazy(() => ProfileUpdateWithoutTagsInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutTagsInputSchema) ]).optional(),
}).strict();

export const TagUpdateOneRequiredWithoutProfileLinksNestedInputSchema: z.ZodType<Prisma.TagUpdateOneRequiredWithoutProfileLinksNestedInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutProfileLinksInputSchema),z.lazy(() => TagUncheckedCreateWithoutProfileLinksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TagCreateOrConnectWithoutProfileLinksInputSchema).optional(),
  upsert: z.lazy(() => TagUpsertWithoutProfileLinksInputSchema).optional(),
  connect: z.lazy(() => TagWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TagUpdateToOneWithWhereWithoutProfileLinksInputSchema),z.lazy(() => TagUpdateWithoutProfileLinksInputSchema),z.lazy(() => TagUncheckedUpdateWithoutProfileLinksInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSearchPreferenceInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSearchPreferenceInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSearchPreferenceInputSchema),z.lazy(() => UserUncheckedCreateWithoutSearchPreferenceInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSearchPreferenceInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutSearchPreferenceNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSearchPreferenceNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSearchPreferenceInputSchema),z.lazy(() => UserUncheckedCreateWithoutSearchPreferenceInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSearchPreferenceInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSearchPreferenceInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSearchPreferenceInputSchema),z.lazy(() => UserUpdateWithoutSearchPreferenceInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSearchPreferenceInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedEnumGenderFilterSchema: z.ZodType<Prisma.NestedEnumGenderFilter> = z.object({
  equals: z.lazy(() => GenderSchema).optional(),
  in: z.lazy(() => GenderSchema).array().optional(),
  notIn: z.lazy(() => GenderSchema).array().optional(),
  not: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NestedEnumGenderFilterSchema) ]).optional(),
}).strict();

export const NestedEnumRelationshipStatusFilterSchema: z.ZodType<Prisma.NestedEnumRelationshipStatusFilter> = z.object({
  equals: z.lazy(() => RelationshipStatusSchema).optional(),
  in: z.lazy(() => RelationshipStatusSchema).array().optional(),
  notIn: z.lazy(() => RelationshipStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => NestedEnumRelationshipStatusFilterSchema) ]).optional(),
}).strict();

export const NestedBoolNullableFilterSchema: z.ZodType<Prisma.NestedBoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumGenderWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumGenderWithAggregatesFilter> = z.object({
  equals: z.lazy(() => GenderSchema).optional(),
  in: z.lazy(() => GenderSchema).array().optional(),
  notIn: z.lazy(() => GenderSchema).array().optional(),
  not: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NestedEnumGenderWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumGenderFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumGenderFilterSchema).optional()
}).strict();

export const NestedEnumRelationshipStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRelationshipStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RelationshipStatusSchema).optional(),
  in: z.lazy(() => RelationshipStatusSchema).array().optional(),
  notIn: z.lazy(() => RelationshipStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => NestedEnumRelationshipStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRelationshipStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRelationshipStatusFilterSchema).optional()
}).strict();

export const NestedBoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const ProfileCreateWithoutUserInputSchema: z.ZodType<Prisma.ProfileCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  intro: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  birthday: z.coerce.date().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional(),
  relationship: z.lazy(() => RelationshipStatusSchema).optional(),
  hasKids: z.boolean().optional().nullable(),
  lookingFor: z.union([ z.lazy(() => ProfileCreatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  images: z.lazy(() => ProfileImageCreateNestedManyWithoutProfileInputSchema).optional(),
  tags: z.lazy(() => ProfileTagCreateNestedManyWithoutProfileInputSchema).optional(),
  primaryImage: z.lazy(() => ProfileImageCreateNestedOneWithoutPrimaryForInputSchema).optional()
}).strict();

export const ProfileUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ProfileUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  intro: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  birthday: z.coerce.date().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional(),
  relationship: z.lazy(() => RelationshipStatusSchema).optional(),
  hasKids: z.boolean().optional().nullable(),
  lookingFor: z.union([ z.lazy(() => ProfileCreatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  primaryImageId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  images: z.lazy(() => ProfileImageUncheckedCreateNestedManyWithoutProfileInputSchema).optional(),
  tags: z.lazy(() => ProfileTagUncheckedCreateNestedManyWithoutProfileInputSchema).optional()
}).strict();

export const ProfileCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ProfileCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ProfileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProfileCreateWithoutUserInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SearchPreferenceCreateWithoutUserInputSchema: z.ZodType<Prisma.SearchPreferenceCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  profileId: z.string(),
  ageMin: z.number().int(),
  ageMax: z.number().int(),
  gender: z.lazy(() => GenderSchema)
}).strict();

export const SearchPreferenceUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SearchPreferenceUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  profileId: z.string(),
  ageMin: z.number().int(),
  ageMax: z.number().int(),
  gender: z.lazy(() => GenderSchema)
}).strict();

export const SearchPreferenceCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SearchPreferenceCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SearchPreferenceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SearchPreferenceCreateWithoutUserInputSchema),z.lazy(() => SearchPreferenceUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ProfileUpsertWithoutUserInputSchema: z.ZodType<Prisma.ProfileUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => ProfileUpdateWithoutUserInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ProfileCreateWithoutUserInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => ProfileWhereInputSchema).optional()
}).strict();

export const ProfileUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ProfileUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ProfileWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProfileUpdateWithoutUserInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const ProfileUpdateWithoutUserInputSchema: z.ZodType<Prisma.ProfileUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  intro: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  relationship: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => EnumRelationshipStatusFieldUpdateOperationsInputSchema) ]).optional(),
  hasKids: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lookingFor: z.union([ z.lazy(() => ProfileUpdatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.lazy(() => ProfileImageUpdateManyWithoutProfileNestedInputSchema).optional(),
  tags: z.lazy(() => ProfileTagUpdateManyWithoutProfileNestedInputSchema).optional(),
  primaryImage: z.lazy(() => ProfileImageUpdateOneWithoutPrimaryForNestedInputSchema).optional()
}).strict();

export const ProfileUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  intro: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  relationship: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => EnumRelationshipStatusFieldUpdateOperationsInputSchema) ]).optional(),
  hasKids: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lookingFor: z.union([ z.lazy(() => ProfileUpdatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  primaryImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.lazy(() => ProfileImageUncheckedUpdateManyWithoutProfileNestedInputSchema).optional(),
  tags: z.lazy(() => ProfileTagUncheckedUpdateManyWithoutProfileNestedInputSchema).optional()
}).strict();

export const SearchPreferenceUpsertWithoutUserInputSchema: z.ZodType<Prisma.SearchPreferenceUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => SearchPreferenceUpdateWithoutUserInputSchema),z.lazy(() => SearchPreferenceUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SearchPreferenceCreateWithoutUserInputSchema),z.lazy(() => SearchPreferenceUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => SearchPreferenceWhereInputSchema).optional()
}).strict();

export const SearchPreferenceUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SearchPreferenceUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SearchPreferenceWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => SearchPreferenceUpdateWithoutUserInputSchema),z.lazy(() => SearchPreferenceUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SearchPreferenceUpdateWithoutUserInputSchema: z.ZodType<Prisma.SearchPreferenceUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ageMin: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ageMax: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SearchPreferenceUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SearchPreferenceUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ageMin: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ageMax: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateWithoutProfileInputSchema: z.ZodType<Prisma.UserCreateWithoutProfileInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  tokenVersion: z.number().int().optional(),
  loginToken: z.string().optional().nullable(),
  loginTokenExp: z.coerce.date().optional().nullable(),
  isRegistrationConfirmed: z.boolean().optional(),
  isAccountDisabled: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lastLoginAt: z.coerce.date().optional().nullable(),
  searchPreferenceId: z.string().optional().nullable(),
  searchPreference: z.lazy(() => SearchPreferenceCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutProfileInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutProfileInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  tokenVersion: z.number().int().optional(),
  loginToken: z.string().optional().nullable(),
  loginTokenExp: z.coerce.date().optional().nullable(),
  isRegistrationConfirmed: z.boolean().optional(),
  isAccountDisabled: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lastLoginAt: z.coerce.date().optional().nullable(),
  searchPreferenceId: z.string().optional().nullable(),
  searchPreference: z.lazy(() => SearchPreferenceUncheckedCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutProfileInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutProfileInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutProfileInputSchema),z.lazy(() => UserUncheckedCreateWithoutProfileInputSchema) ]),
}).strict();

export const ProfileImageCreateWithoutProfileInputSchema: z.ZodType<Prisma.ProfileImageCreateWithoutProfileInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  mimeType: z.string(),
  size: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  primaryFor: z.lazy(() => ProfileCreateNestedOneWithoutPrimaryImageInputSchema).optional()
}).strict();

export const ProfileImageUncheckedCreateWithoutProfileInputSchema: z.ZodType<Prisma.ProfileImageUncheckedCreateWithoutProfileInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  mimeType: z.string(),
  size: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  primaryFor: z.lazy(() => ProfileUncheckedCreateNestedOneWithoutPrimaryImageInputSchema).optional()
}).strict();

export const ProfileImageCreateOrConnectWithoutProfileInputSchema: z.ZodType<Prisma.ProfileImageCreateOrConnectWithoutProfileInput> = z.object({
  where: z.lazy(() => ProfileImageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProfileImageCreateWithoutProfileInputSchema),z.lazy(() => ProfileImageUncheckedCreateWithoutProfileInputSchema) ]),
}).strict();

export const ProfileImageCreateManyProfileInputEnvelopeSchema: z.ZodType<Prisma.ProfileImageCreateManyProfileInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ProfileImageCreateManyProfileInputSchema),z.lazy(() => ProfileImageCreateManyProfileInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ProfileTagCreateWithoutProfileInputSchema: z.ZodType<Prisma.ProfileTagCreateWithoutProfileInput> = z.object({
  id: z.string().cuid().optional(),
  tag: z.lazy(() => TagCreateNestedOneWithoutProfileLinksInputSchema)
}).strict();

export const ProfileTagUncheckedCreateWithoutProfileInputSchema: z.ZodType<Prisma.ProfileTagUncheckedCreateWithoutProfileInput> = z.object({
  id: z.string().cuid().optional(),
  tagId: z.string()
}).strict();

export const ProfileTagCreateOrConnectWithoutProfileInputSchema: z.ZodType<Prisma.ProfileTagCreateOrConnectWithoutProfileInput> = z.object({
  where: z.lazy(() => ProfileTagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProfileTagCreateWithoutProfileInputSchema),z.lazy(() => ProfileTagUncheckedCreateWithoutProfileInputSchema) ]),
}).strict();

export const ProfileTagCreateManyProfileInputEnvelopeSchema: z.ZodType<Prisma.ProfileTagCreateManyProfileInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ProfileTagCreateManyProfileInputSchema),z.lazy(() => ProfileTagCreateManyProfileInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ProfileImageCreateWithoutPrimaryForInputSchema: z.ZodType<Prisma.ProfileImageCreateWithoutPrimaryForInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  mimeType: z.string(),
  size: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutImagesInputSchema).optional()
}).strict();

export const ProfileImageUncheckedCreateWithoutPrimaryForInputSchema: z.ZodType<Prisma.ProfileImageUncheckedCreateWithoutPrimaryForInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  mimeType: z.string(),
  size: z.number().int(),
  profileId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ProfileImageCreateOrConnectWithoutPrimaryForInputSchema: z.ZodType<Prisma.ProfileImageCreateOrConnectWithoutPrimaryForInput> = z.object({
  where: z.lazy(() => ProfileImageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProfileImageCreateWithoutPrimaryForInputSchema),z.lazy(() => ProfileImageUncheckedCreateWithoutPrimaryForInputSchema) ]),
}).strict();

export const UserUpsertWithoutProfileInputSchema: z.ZodType<Prisma.UserUpsertWithoutProfileInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutProfileInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProfileInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutProfileInputSchema),z.lazy(() => UserUncheckedCreateWithoutProfileInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutProfileInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutProfileInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutProfileInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProfileInputSchema) ]),
}).strict();

export const UserUpdateWithoutProfileInputSchema: z.ZodType<Prisma.UserUpdateWithoutProfileInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tokenVersion: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  loginToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  loginTokenExp: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isRegistrationConfirmed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isAccountDisabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastLoginAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  searchPreferenceId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  searchPreference: z.lazy(() => SearchPreferenceUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutProfileInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutProfileInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tokenVersion: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  loginToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  loginTokenExp: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isRegistrationConfirmed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isAccountDisabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastLoginAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  searchPreferenceId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  searchPreference: z.lazy(() => SearchPreferenceUncheckedUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const ProfileImageUpsertWithWhereUniqueWithoutProfileInputSchema: z.ZodType<Prisma.ProfileImageUpsertWithWhereUniqueWithoutProfileInput> = z.object({
  where: z.lazy(() => ProfileImageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProfileImageUpdateWithoutProfileInputSchema),z.lazy(() => ProfileImageUncheckedUpdateWithoutProfileInputSchema) ]),
  create: z.union([ z.lazy(() => ProfileImageCreateWithoutProfileInputSchema),z.lazy(() => ProfileImageUncheckedCreateWithoutProfileInputSchema) ]),
}).strict();

export const ProfileImageUpdateWithWhereUniqueWithoutProfileInputSchema: z.ZodType<Prisma.ProfileImageUpdateWithWhereUniqueWithoutProfileInput> = z.object({
  where: z.lazy(() => ProfileImageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProfileImageUpdateWithoutProfileInputSchema),z.lazy(() => ProfileImageUncheckedUpdateWithoutProfileInputSchema) ]),
}).strict();

export const ProfileImageUpdateManyWithWhereWithoutProfileInputSchema: z.ZodType<Prisma.ProfileImageUpdateManyWithWhereWithoutProfileInput> = z.object({
  where: z.lazy(() => ProfileImageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProfileImageUpdateManyMutationInputSchema),z.lazy(() => ProfileImageUncheckedUpdateManyWithoutProfileInputSchema) ]),
}).strict();

export const ProfileImageScalarWhereInputSchema: z.ZodType<Prisma.ProfileImageScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProfileImageScalarWhereInputSchema),z.lazy(() => ProfileImageScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfileImageScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfileImageScalarWhereInputSchema),z.lazy(() => ProfileImageScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  mimeType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  size: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  profileId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ProfileTagUpsertWithWhereUniqueWithoutProfileInputSchema: z.ZodType<Prisma.ProfileTagUpsertWithWhereUniqueWithoutProfileInput> = z.object({
  where: z.lazy(() => ProfileTagWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProfileTagUpdateWithoutProfileInputSchema),z.lazy(() => ProfileTagUncheckedUpdateWithoutProfileInputSchema) ]),
  create: z.union([ z.lazy(() => ProfileTagCreateWithoutProfileInputSchema),z.lazy(() => ProfileTagUncheckedCreateWithoutProfileInputSchema) ]),
}).strict();

export const ProfileTagUpdateWithWhereUniqueWithoutProfileInputSchema: z.ZodType<Prisma.ProfileTagUpdateWithWhereUniqueWithoutProfileInput> = z.object({
  where: z.lazy(() => ProfileTagWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProfileTagUpdateWithoutProfileInputSchema),z.lazy(() => ProfileTagUncheckedUpdateWithoutProfileInputSchema) ]),
}).strict();

export const ProfileTagUpdateManyWithWhereWithoutProfileInputSchema: z.ZodType<Prisma.ProfileTagUpdateManyWithWhereWithoutProfileInput> = z.object({
  where: z.lazy(() => ProfileTagScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProfileTagUpdateManyMutationInputSchema),z.lazy(() => ProfileTagUncheckedUpdateManyWithoutProfileInputSchema) ]),
}).strict();

export const ProfileTagScalarWhereInputSchema: z.ZodType<Prisma.ProfileTagScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProfileTagScalarWhereInputSchema),z.lazy(() => ProfileTagScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfileTagScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfileTagScalarWhereInputSchema),z.lazy(() => ProfileTagScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  profileId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tagId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const ProfileImageUpsertWithoutPrimaryForInputSchema: z.ZodType<Prisma.ProfileImageUpsertWithoutPrimaryForInput> = z.object({
  update: z.union([ z.lazy(() => ProfileImageUpdateWithoutPrimaryForInputSchema),z.lazy(() => ProfileImageUncheckedUpdateWithoutPrimaryForInputSchema) ]),
  create: z.union([ z.lazy(() => ProfileImageCreateWithoutPrimaryForInputSchema),z.lazy(() => ProfileImageUncheckedCreateWithoutPrimaryForInputSchema) ]),
  where: z.lazy(() => ProfileImageWhereInputSchema).optional()
}).strict();

export const ProfileImageUpdateToOneWithWhereWithoutPrimaryForInputSchema: z.ZodType<Prisma.ProfileImageUpdateToOneWithWhereWithoutPrimaryForInput> = z.object({
  where: z.lazy(() => ProfileImageWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProfileImageUpdateWithoutPrimaryForInputSchema),z.lazy(() => ProfileImageUncheckedUpdateWithoutPrimaryForInputSchema) ]),
}).strict();

export const ProfileImageUpdateWithoutPrimaryForInputSchema: z.ZodType<Prisma.ProfileImageUpdateWithoutPrimaryForInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  profile: z.lazy(() => ProfileUpdateOneWithoutImagesNestedInputSchema).optional()
}).strict();

export const ProfileImageUncheckedUpdateWithoutPrimaryForInputSchema: z.ZodType<Prisma.ProfileImageUncheckedUpdateWithoutPrimaryForInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfileCreateWithoutImagesInputSchema: z.ZodType<Prisma.ProfileCreateWithoutImagesInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  intro: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  birthday: z.coerce.date().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional(),
  relationship: z.lazy(() => RelationshipStatusSchema).optional(),
  hasKids: z.boolean().optional().nullable(),
  lookingFor: z.union([ z.lazy(() => ProfileCreatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutProfileInputSchema),
  tags: z.lazy(() => ProfileTagCreateNestedManyWithoutProfileInputSchema).optional(),
  primaryImage: z.lazy(() => ProfileImageCreateNestedOneWithoutPrimaryForInputSchema).optional()
}).strict();

export const ProfileUncheckedCreateWithoutImagesInputSchema: z.ZodType<Prisma.ProfileUncheckedCreateWithoutImagesInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  intro: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  birthday: z.coerce.date().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional(),
  relationship: z.lazy(() => RelationshipStatusSchema).optional(),
  hasKids: z.boolean().optional().nullable(),
  lookingFor: z.union([ z.lazy(() => ProfileCreatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  userId: z.string(),
  primaryImageId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tags: z.lazy(() => ProfileTagUncheckedCreateNestedManyWithoutProfileInputSchema).optional()
}).strict();

export const ProfileCreateOrConnectWithoutImagesInputSchema: z.ZodType<Prisma.ProfileCreateOrConnectWithoutImagesInput> = z.object({
  where: z.lazy(() => ProfileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProfileCreateWithoutImagesInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutImagesInputSchema) ]),
}).strict();

export const ProfileCreateWithoutPrimaryImageInputSchema: z.ZodType<Prisma.ProfileCreateWithoutPrimaryImageInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  intro: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  birthday: z.coerce.date().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional(),
  relationship: z.lazy(() => RelationshipStatusSchema).optional(),
  hasKids: z.boolean().optional().nullable(),
  lookingFor: z.union([ z.lazy(() => ProfileCreatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutProfileInputSchema),
  images: z.lazy(() => ProfileImageCreateNestedManyWithoutProfileInputSchema).optional(),
  tags: z.lazy(() => ProfileTagCreateNestedManyWithoutProfileInputSchema).optional()
}).strict();

export const ProfileUncheckedCreateWithoutPrimaryImageInputSchema: z.ZodType<Prisma.ProfileUncheckedCreateWithoutPrimaryImageInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  intro: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  birthday: z.coerce.date().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional(),
  relationship: z.lazy(() => RelationshipStatusSchema).optional(),
  hasKids: z.boolean().optional().nullable(),
  lookingFor: z.union([ z.lazy(() => ProfileCreatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  images: z.lazy(() => ProfileImageUncheckedCreateNestedManyWithoutProfileInputSchema).optional(),
  tags: z.lazy(() => ProfileTagUncheckedCreateNestedManyWithoutProfileInputSchema).optional()
}).strict();

export const ProfileCreateOrConnectWithoutPrimaryImageInputSchema: z.ZodType<Prisma.ProfileCreateOrConnectWithoutPrimaryImageInput> = z.object({
  where: z.lazy(() => ProfileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProfileCreateWithoutPrimaryImageInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutPrimaryImageInputSchema) ]),
}).strict();

export const ProfileUpsertWithoutImagesInputSchema: z.ZodType<Prisma.ProfileUpsertWithoutImagesInput> = z.object({
  update: z.union([ z.lazy(() => ProfileUpdateWithoutImagesInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutImagesInputSchema) ]),
  create: z.union([ z.lazy(() => ProfileCreateWithoutImagesInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutImagesInputSchema) ]),
  where: z.lazy(() => ProfileWhereInputSchema).optional()
}).strict();

export const ProfileUpdateToOneWithWhereWithoutImagesInputSchema: z.ZodType<Prisma.ProfileUpdateToOneWithWhereWithoutImagesInput> = z.object({
  where: z.lazy(() => ProfileWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProfileUpdateWithoutImagesInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutImagesInputSchema) ]),
}).strict();

export const ProfileUpdateWithoutImagesInputSchema: z.ZodType<Prisma.ProfileUpdateWithoutImagesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  intro: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  relationship: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => EnumRelationshipStatusFieldUpdateOperationsInputSchema) ]).optional(),
  hasKids: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lookingFor: z.union([ z.lazy(() => ProfileUpdatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutProfileNestedInputSchema).optional(),
  tags: z.lazy(() => ProfileTagUpdateManyWithoutProfileNestedInputSchema).optional(),
  primaryImage: z.lazy(() => ProfileImageUpdateOneWithoutPrimaryForNestedInputSchema).optional()
}).strict();

export const ProfileUncheckedUpdateWithoutImagesInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateWithoutImagesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  intro: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  relationship: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => EnumRelationshipStatusFieldUpdateOperationsInputSchema) ]).optional(),
  hasKids: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lookingFor: z.union([ z.lazy(() => ProfileUpdatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  primaryImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => ProfileTagUncheckedUpdateManyWithoutProfileNestedInputSchema).optional()
}).strict();

export const ProfileUpsertWithoutPrimaryImageInputSchema: z.ZodType<Prisma.ProfileUpsertWithoutPrimaryImageInput> = z.object({
  update: z.union([ z.lazy(() => ProfileUpdateWithoutPrimaryImageInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutPrimaryImageInputSchema) ]),
  create: z.union([ z.lazy(() => ProfileCreateWithoutPrimaryImageInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutPrimaryImageInputSchema) ]),
  where: z.lazy(() => ProfileWhereInputSchema).optional()
}).strict();

export const ProfileUpdateToOneWithWhereWithoutPrimaryImageInputSchema: z.ZodType<Prisma.ProfileUpdateToOneWithWhereWithoutPrimaryImageInput> = z.object({
  where: z.lazy(() => ProfileWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProfileUpdateWithoutPrimaryImageInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutPrimaryImageInputSchema) ]),
}).strict();

export const ProfileUpdateWithoutPrimaryImageInputSchema: z.ZodType<Prisma.ProfileUpdateWithoutPrimaryImageInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  intro: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  relationship: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => EnumRelationshipStatusFieldUpdateOperationsInputSchema) ]).optional(),
  hasKids: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lookingFor: z.union([ z.lazy(() => ProfileUpdatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutProfileNestedInputSchema).optional(),
  images: z.lazy(() => ProfileImageUpdateManyWithoutProfileNestedInputSchema).optional(),
  tags: z.lazy(() => ProfileTagUpdateManyWithoutProfileNestedInputSchema).optional()
}).strict();

export const ProfileUncheckedUpdateWithoutPrimaryImageInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateWithoutPrimaryImageInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  intro: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  relationship: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => EnumRelationshipStatusFieldUpdateOperationsInputSchema) ]).optional(),
  hasKids: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lookingFor: z.union([ z.lazy(() => ProfileUpdatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.lazy(() => ProfileImageUncheckedUpdateManyWithoutProfileNestedInputSchema).optional(),
  tags: z.lazy(() => ProfileTagUncheckedUpdateManyWithoutProfileNestedInputSchema).optional()
}).strict();

export const ProfileTagCreateWithoutTagInputSchema: z.ZodType<Prisma.ProfileTagCreateWithoutTagInput> = z.object({
  id: z.string().cuid().optional(),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutTagsInputSchema)
}).strict();

export const ProfileTagUncheckedCreateWithoutTagInputSchema: z.ZodType<Prisma.ProfileTagUncheckedCreateWithoutTagInput> = z.object({
  id: z.string().cuid().optional(),
  profileId: z.string()
}).strict();

export const ProfileTagCreateOrConnectWithoutTagInputSchema: z.ZodType<Prisma.ProfileTagCreateOrConnectWithoutTagInput> = z.object({
  where: z.lazy(() => ProfileTagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProfileTagCreateWithoutTagInputSchema),z.lazy(() => ProfileTagUncheckedCreateWithoutTagInputSchema) ]),
}).strict();

export const ProfileTagCreateManyTagInputEnvelopeSchema: z.ZodType<Prisma.ProfileTagCreateManyTagInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ProfileTagCreateManyTagInputSchema),z.lazy(() => ProfileTagCreateManyTagInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ProfileTagUpsertWithWhereUniqueWithoutTagInputSchema: z.ZodType<Prisma.ProfileTagUpsertWithWhereUniqueWithoutTagInput> = z.object({
  where: z.lazy(() => ProfileTagWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProfileTagUpdateWithoutTagInputSchema),z.lazy(() => ProfileTagUncheckedUpdateWithoutTagInputSchema) ]),
  create: z.union([ z.lazy(() => ProfileTagCreateWithoutTagInputSchema),z.lazy(() => ProfileTagUncheckedCreateWithoutTagInputSchema) ]),
}).strict();

export const ProfileTagUpdateWithWhereUniqueWithoutTagInputSchema: z.ZodType<Prisma.ProfileTagUpdateWithWhereUniqueWithoutTagInput> = z.object({
  where: z.lazy(() => ProfileTagWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProfileTagUpdateWithoutTagInputSchema),z.lazy(() => ProfileTagUncheckedUpdateWithoutTagInputSchema) ]),
}).strict();

export const ProfileTagUpdateManyWithWhereWithoutTagInputSchema: z.ZodType<Prisma.ProfileTagUpdateManyWithWhereWithoutTagInput> = z.object({
  where: z.lazy(() => ProfileTagScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProfileTagUpdateManyMutationInputSchema),z.lazy(() => ProfileTagUncheckedUpdateManyWithoutTagInputSchema) ]),
}).strict();

export const ProfileCreateWithoutTagsInputSchema: z.ZodType<Prisma.ProfileCreateWithoutTagsInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  intro: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  birthday: z.coerce.date().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional(),
  relationship: z.lazy(() => RelationshipStatusSchema).optional(),
  hasKids: z.boolean().optional().nullable(),
  lookingFor: z.union([ z.lazy(() => ProfileCreatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutProfileInputSchema),
  images: z.lazy(() => ProfileImageCreateNestedManyWithoutProfileInputSchema).optional(),
  primaryImage: z.lazy(() => ProfileImageCreateNestedOneWithoutPrimaryForInputSchema).optional()
}).strict();

export const ProfileUncheckedCreateWithoutTagsInputSchema: z.ZodType<Prisma.ProfileUncheckedCreateWithoutTagsInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  intro: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  birthday: z.coerce.date().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional(),
  relationship: z.lazy(() => RelationshipStatusSchema).optional(),
  hasKids: z.boolean().optional().nullable(),
  lookingFor: z.union([ z.lazy(() => ProfileCreatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  userId: z.string(),
  primaryImageId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  images: z.lazy(() => ProfileImageUncheckedCreateNestedManyWithoutProfileInputSchema).optional()
}).strict();

export const ProfileCreateOrConnectWithoutTagsInputSchema: z.ZodType<Prisma.ProfileCreateOrConnectWithoutTagsInput> = z.object({
  where: z.lazy(() => ProfileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProfileCreateWithoutTagsInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutTagsInputSchema) ]),
}).strict();

export const TagCreateWithoutProfileLinksInputSchema: z.ZodType<Prisma.TagCreateWithoutProfileLinksInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string()
}).strict();

export const TagUncheckedCreateWithoutProfileLinksInputSchema: z.ZodType<Prisma.TagUncheckedCreateWithoutProfileLinksInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string()
}).strict();

export const TagCreateOrConnectWithoutProfileLinksInputSchema: z.ZodType<Prisma.TagCreateOrConnectWithoutProfileLinksInput> = z.object({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TagCreateWithoutProfileLinksInputSchema),z.lazy(() => TagUncheckedCreateWithoutProfileLinksInputSchema) ]),
}).strict();

export const ProfileUpsertWithoutTagsInputSchema: z.ZodType<Prisma.ProfileUpsertWithoutTagsInput> = z.object({
  update: z.union([ z.lazy(() => ProfileUpdateWithoutTagsInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutTagsInputSchema) ]),
  create: z.union([ z.lazy(() => ProfileCreateWithoutTagsInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutTagsInputSchema) ]),
  where: z.lazy(() => ProfileWhereInputSchema).optional()
}).strict();

export const ProfileUpdateToOneWithWhereWithoutTagsInputSchema: z.ZodType<Prisma.ProfileUpdateToOneWithWhereWithoutTagsInput> = z.object({
  where: z.lazy(() => ProfileWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProfileUpdateWithoutTagsInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutTagsInputSchema) ]),
}).strict();

export const ProfileUpdateWithoutTagsInputSchema: z.ZodType<Prisma.ProfileUpdateWithoutTagsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  intro: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  relationship: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => EnumRelationshipStatusFieldUpdateOperationsInputSchema) ]).optional(),
  hasKids: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lookingFor: z.union([ z.lazy(() => ProfileUpdatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutProfileNestedInputSchema).optional(),
  images: z.lazy(() => ProfileImageUpdateManyWithoutProfileNestedInputSchema).optional(),
  primaryImage: z.lazy(() => ProfileImageUpdateOneWithoutPrimaryForNestedInputSchema).optional()
}).strict();

export const ProfileUncheckedUpdateWithoutTagsInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateWithoutTagsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  intro: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  relationship: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => EnumRelationshipStatusFieldUpdateOperationsInputSchema) ]).optional(),
  hasKids: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lookingFor: z.union([ z.lazy(() => ProfileUpdatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  primaryImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.lazy(() => ProfileImageUncheckedUpdateManyWithoutProfileNestedInputSchema).optional()
}).strict();

export const TagUpsertWithoutProfileLinksInputSchema: z.ZodType<Prisma.TagUpsertWithoutProfileLinksInput> = z.object({
  update: z.union([ z.lazy(() => TagUpdateWithoutProfileLinksInputSchema),z.lazy(() => TagUncheckedUpdateWithoutProfileLinksInputSchema) ]),
  create: z.union([ z.lazy(() => TagCreateWithoutProfileLinksInputSchema),z.lazy(() => TagUncheckedCreateWithoutProfileLinksInputSchema) ]),
  where: z.lazy(() => TagWhereInputSchema).optional()
}).strict();

export const TagUpdateToOneWithWhereWithoutProfileLinksInputSchema: z.ZodType<Prisma.TagUpdateToOneWithWhereWithoutProfileLinksInput> = z.object({
  where: z.lazy(() => TagWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TagUpdateWithoutProfileLinksInputSchema),z.lazy(() => TagUncheckedUpdateWithoutProfileLinksInputSchema) ]),
}).strict();

export const TagUpdateWithoutProfileLinksInputSchema: z.ZodType<Prisma.TagUpdateWithoutProfileLinksInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagUncheckedUpdateWithoutProfileLinksInputSchema: z.ZodType<Prisma.TagUncheckedUpdateWithoutProfileLinksInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateWithoutSearchPreferenceInputSchema: z.ZodType<Prisma.UserCreateWithoutSearchPreferenceInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  tokenVersion: z.number().int().optional(),
  loginToken: z.string().optional().nullable(),
  loginTokenExp: z.coerce.date().optional().nullable(),
  isRegistrationConfirmed: z.boolean().optional(),
  isAccountDisabled: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lastLoginAt: z.coerce.date().optional().nullable(),
  searchPreferenceId: z.string().optional().nullable(),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSearchPreferenceInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSearchPreferenceInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  tokenVersion: z.number().int().optional(),
  loginToken: z.string().optional().nullable(),
  loginTokenExp: z.coerce.date().optional().nullable(),
  isRegistrationConfirmed: z.boolean().optional(),
  isAccountDisabled: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lastLoginAt: z.coerce.date().optional().nullable(),
  searchPreferenceId: z.string().optional().nullable(),
  profile: z.lazy(() => ProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSearchPreferenceInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSearchPreferenceInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSearchPreferenceInputSchema),z.lazy(() => UserUncheckedCreateWithoutSearchPreferenceInputSchema) ]),
}).strict();

export const UserUpsertWithoutSearchPreferenceInputSchema: z.ZodType<Prisma.UserUpsertWithoutSearchPreferenceInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSearchPreferenceInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSearchPreferenceInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSearchPreferenceInputSchema),z.lazy(() => UserUncheckedCreateWithoutSearchPreferenceInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSearchPreferenceInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSearchPreferenceInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSearchPreferenceInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSearchPreferenceInputSchema) ]),
}).strict();

export const UserUpdateWithoutSearchPreferenceInputSchema: z.ZodType<Prisma.UserUpdateWithoutSearchPreferenceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tokenVersion: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  loginToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  loginTokenExp: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isRegistrationConfirmed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isAccountDisabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastLoginAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  searchPreferenceId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profile: z.lazy(() => ProfileUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSearchPreferenceInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSearchPreferenceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tokenVersion: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  loginToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  loginTokenExp: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isRegistrationConfirmed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isAccountDisabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastLoginAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  searchPreferenceId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profile: z.lazy(() => ProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const ProfileImageCreateManyProfileInputSchema: z.ZodType<Prisma.ProfileImageCreateManyProfileInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  mimeType: z.string(),
  size: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ProfileTagCreateManyProfileInputSchema: z.ZodType<Prisma.ProfileTagCreateManyProfileInput> = z.object({
  id: z.string().cuid().optional(),
  tagId: z.string()
}).strict();

export const ProfileImageUpdateWithoutProfileInputSchema: z.ZodType<Prisma.ProfileImageUpdateWithoutProfileInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  primaryFor: z.lazy(() => ProfileUpdateOneWithoutPrimaryImageNestedInputSchema).optional()
}).strict();

export const ProfileImageUncheckedUpdateWithoutProfileInputSchema: z.ZodType<Prisma.ProfileImageUncheckedUpdateWithoutProfileInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  primaryFor: z.lazy(() => ProfileUncheckedUpdateOneWithoutPrimaryImageNestedInputSchema).optional()
}).strict();

export const ProfileImageUncheckedUpdateManyWithoutProfileInputSchema: z.ZodType<Prisma.ProfileImageUncheckedUpdateManyWithoutProfileInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfileTagUpdateWithoutProfileInputSchema: z.ZodType<Prisma.ProfileTagUpdateWithoutProfileInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tag: z.lazy(() => TagUpdateOneRequiredWithoutProfileLinksNestedInputSchema).optional()
}).strict();

export const ProfileTagUncheckedUpdateWithoutProfileInputSchema: z.ZodType<Prisma.ProfileTagUncheckedUpdateWithoutProfileInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfileTagUncheckedUpdateManyWithoutProfileInputSchema: z.ZodType<Prisma.ProfileTagUncheckedUpdateManyWithoutProfileInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfileTagCreateManyTagInputSchema: z.ZodType<Prisma.ProfileTagCreateManyTagInput> = z.object({
  id: z.string().cuid().optional(),
  profileId: z.string()
}).strict();

export const ProfileTagUpdateWithoutTagInputSchema: z.ZodType<Prisma.ProfileTagUpdateWithoutTagInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profile: z.lazy(() => ProfileUpdateOneRequiredWithoutTagsNestedInputSchema).optional()
}).strict();

export const ProfileTagUncheckedUpdateWithoutTagInputSchema: z.ZodType<Prisma.ProfileTagUncheckedUpdateWithoutTagInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfileTagUncheckedUpdateManyWithoutTagInputSchema: z.ZodType<Prisma.ProfileTagUncheckedUpdateManyWithoutTagInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const ProfileFindFirstArgsSchema: z.ZodType<Prisma.ProfileFindFirstArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  where: ProfileWhereInputSchema.optional(),
  orderBy: z.union([ ProfileOrderByWithRelationInputSchema.array(),ProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: ProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProfileScalarFieldEnumSchema,ProfileScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProfileFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProfileFindFirstOrThrowArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  where: ProfileWhereInputSchema.optional(),
  orderBy: z.union([ ProfileOrderByWithRelationInputSchema.array(),ProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: ProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProfileScalarFieldEnumSchema,ProfileScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProfileFindManyArgsSchema: z.ZodType<Prisma.ProfileFindManyArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  where: ProfileWhereInputSchema.optional(),
  orderBy: z.union([ ProfileOrderByWithRelationInputSchema.array(),ProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: ProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProfileScalarFieldEnumSchema,ProfileScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProfileAggregateArgsSchema: z.ZodType<Prisma.ProfileAggregateArgs> = z.object({
  where: ProfileWhereInputSchema.optional(),
  orderBy: z.union([ ProfileOrderByWithRelationInputSchema.array(),ProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: ProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProfileGroupByArgsSchema: z.ZodType<Prisma.ProfileGroupByArgs> = z.object({
  where: ProfileWhereInputSchema.optional(),
  orderBy: z.union([ ProfileOrderByWithAggregationInputSchema.array(),ProfileOrderByWithAggregationInputSchema ]).optional(),
  by: ProfileScalarFieldEnumSchema.array(),
  having: ProfileScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProfileFindUniqueArgsSchema: z.ZodType<Prisma.ProfileFindUniqueArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  where: ProfileWhereUniqueInputSchema,
}).strict() ;

export const ProfileFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProfileFindUniqueOrThrowArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  where: ProfileWhereUniqueInputSchema,
}).strict() ;

export const ProfileImageFindFirstArgsSchema: z.ZodType<Prisma.ProfileImageFindFirstArgs> = z.object({
  select: ProfileImageSelectSchema.optional(),
  include: ProfileImageIncludeSchema.optional(),
  where: ProfileImageWhereInputSchema.optional(),
  orderBy: z.union([ ProfileImageOrderByWithRelationInputSchema.array(),ProfileImageOrderByWithRelationInputSchema ]).optional(),
  cursor: ProfileImageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProfileImageScalarFieldEnumSchema,ProfileImageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProfileImageFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProfileImageFindFirstOrThrowArgs> = z.object({
  select: ProfileImageSelectSchema.optional(),
  include: ProfileImageIncludeSchema.optional(),
  where: ProfileImageWhereInputSchema.optional(),
  orderBy: z.union([ ProfileImageOrderByWithRelationInputSchema.array(),ProfileImageOrderByWithRelationInputSchema ]).optional(),
  cursor: ProfileImageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProfileImageScalarFieldEnumSchema,ProfileImageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProfileImageFindManyArgsSchema: z.ZodType<Prisma.ProfileImageFindManyArgs> = z.object({
  select: ProfileImageSelectSchema.optional(),
  include: ProfileImageIncludeSchema.optional(),
  where: ProfileImageWhereInputSchema.optional(),
  orderBy: z.union([ ProfileImageOrderByWithRelationInputSchema.array(),ProfileImageOrderByWithRelationInputSchema ]).optional(),
  cursor: ProfileImageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProfileImageScalarFieldEnumSchema,ProfileImageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProfileImageAggregateArgsSchema: z.ZodType<Prisma.ProfileImageAggregateArgs> = z.object({
  where: ProfileImageWhereInputSchema.optional(),
  orderBy: z.union([ ProfileImageOrderByWithRelationInputSchema.array(),ProfileImageOrderByWithRelationInputSchema ]).optional(),
  cursor: ProfileImageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProfileImageGroupByArgsSchema: z.ZodType<Prisma.ProfileImageGroupByArgs> = z.object({
  where: ProfileImageWhereInputSchema.optional(),
  orderBy: z.union([ ProfileImageOrderByWithAggregationInputSchema.array(),ProfileImageOrderByWithAggregationInputSchema ]).optional(),
  by: ProfileImageScalarFieldEnumSchema.array(),
  having: ProfileImageScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProfileImageFindUniqueArgsSchema: z.ZodType<Prisma.ProfileImageFindUniqueArgs> = z.object({
  select: ProfileImageSelectSchema.optional(),
  include: ProfileImageIncludeSchema.optional(),
  where: ProfileImageWhereUniqueInputSchema,
}).strict() ;

export const ProfileImageFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProfileImageFindUniqueOrThrowArgs> = z.object({
  select: ProfileImageSelectSchema.optional(),
  include: ProfileImageIncludeSchema.optional(),
  where: ProfileImageWhereUniqueInputSchema,
}).strict() ;

export const TagFindFirstArgsSchema: z.ZodType<Prisma.TagFindFirstArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagScalarFieldEnumSchema,TagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TagFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TagFindFirstOrThrowArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagScalarFieldEnumSchema,TagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TagFindManyArgsSchema: z.ZodType<Prisma.TagFindManyArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagScalarFieldEnumSchema,TagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TagAggregateArgsSchema: z.ZodType<Prisma.TagAggregateArgs> = z.object({
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TagGroupByArgsSchema: z.ZodType<Prisma.TagGroupByArgs> = z.object({
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithAggregationInputSchema.array(),TagOrderByWithAggregationInputSchema ]).optional(),
  by: TagScalarFieldEnumSchema.array(),
  having: TagScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TagFindUniqueArgsSchema: z.ZodType<Prisma.TagFindUniqueArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const TagFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TagFindUniqueOrThrowArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const ProfileTagFindFirstArgsSchema: z.ZodType<Prisma.ProfileTagFindFirstArgs> = z.object({
  select: ProfileTagSelectSchema.optional(),
  include: ProfileTagIncludeSchema.optional(),
  where: ProfileTagWhereInputSchema.optional(),
  orderBy: z.union([ ProfileTagOrderByWithRelationInputSchema.array(),ProfileTagOrderByWithRelationInputSchema ]).optional(),
  cursor: ProfileTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProfileTagScalarFieldEnumSchema,ProfileTagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProfileTagFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProfileTagFindFirstOrThrowArgs> = z.object({
  select: ProfileTagSelectSchema.optional(),
  include: ProfileTagIncludeSchema.optional(),
  where: ProfileTagWhereInputSchema.optional(),
  orderBy: z.union([ ProfileTagOrderByWithRelationInputSchema.array(),ProfileTagOrderByWithRelationInputSchema ]).optional(),
  cursor: ProfileTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProfileTagScalarFieldEnumSchema,ProfileTagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProfileTagFindManyArgsSchema: z.ZodType<Prisma.ProfileTagFindManyArgs> = z.object({
  select: ProfileTagSelectSchema.optional(),
  include: ProfileTagIncludeSchema.optional(),
  where: ProfileTagWhereInputSchema.optional(),
  orderBy: z.union([ ProfileTagOrderByWithRelationInputSchema.array(),ProfileTagOrderByWithRelationInputSchema ]).optional(),
  cursor: ProfileTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProfileTagScalarFieldEnumSchema,ProfileTagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProfileTagAggregateArgsSchema: z.ZodType<Prisma.ProfileTagAggregateArgs> = z.object({
  where: ProfileTagWhereInputSchema.optional(),
  orderBy: z.union([ ProfileTagOrderByWithRelationInputSchema.array(),ProfileTagOrderByWithRelationInputSchema ]).optional(),
  cursor: ProfileTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProfileTagGroupByArgsSchema: z.ZodType<Prisma.ProfileTagGroupByArgs> = z.object({
  where: ProfileTagWhereInputSchema.optional(),
  orderBy: z.union([ ProfileTagOrderByWithAggregationInputSchema.array(),ProfileTagOrderByWithAggregationInputSchema ]).optional(),
  by: ProfileTagScalarFieldEnumSchema.array(),
  having: ProfileTagScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProfileTagFindUniqueArgsSchema: z.ZodType<Prisma.ProfileTagFindUniqueArgs> = z.object({
  select: ProfileTagSelectSchema.optional(),
  include: ProfileTagIncludeSchema.optional(),
  where: ProfileTagWhereUniqueInputSchema,
}).strict() ;

export const ProfileTagFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProfileTagFindUniqueOrThrowArgs> = z.object({
  select: ProfileTagSelectSchema.optional(),
  include: ProfileTagIncludeSchema.optional(),
  where: ProfileTagWhereUniqueInputSchema,
}).strict() ;

export const SearchPreferenceFindFirstArgsSchema: z.ZodType<Prisma.SearchPreferenceFindFirstArgs> = z.object({
  select: SearchPreferenceSelectSchema.optional(),
  include: SearchPreferenceIncludeSchema.optional(),
  where: SearchPreferenceWhereInputSchema.optional(),
  orderBy: z.union([ SearchPreferenceOrderByWithRelationInputSchema.array(),SearchPreferenceOrderByWithRelationInputSchema ]).optional(),
  cursor: SearchPreferenceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SearchPreferenceScalarFieldEnumSchema,SearchPreferenceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SearchPreferenceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SearchPreferenceFindFirstOrThrowArgs> = z.object({
  select: SearchPreferenceSelectSchema.optional(),
  include: SearchPreferenceIncludeSchema.optional(),
  where: SearchPreferenceWhereInputSchema.optional(),
  orderBy: z.union([ SearchPreferenceOrderByWithRelationInputSchema.array(),SearchPreferenceOrderByWithRelationInputSchema ]).optional(),
  cursor: SearchPreferenceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SearchPreferenceScalarFieldEnumSchema,SearchPreferenceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SearchPreferenceFindManyArgsSchema: z.ZodType<Prisma.SearchPreferenceFindManyArgs> = z.object({
  select: SearchPreferenceSelectSchema.optional(),
  include: SearchPreferenceIncludeSchema.optional(),
  where: SearchPreferenceWhereInputSchema.optional(),
  orderBy: z.union([ SearchPreferenceOrderByWithRelationInputSchema.array(),SearchPreferenceOrderByWithRelationInputSchema ]).optional(),
  cursor: SearchPreferenceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SearchPreferenceScalarFieldEnumSchema,SearchPreferenceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SearchPreferenceAggregateArgsSchema: z.ZodType<Prisma.SearchPreferenceAggregateArgs> = z.object({
  where: SearchPreferenceWhereInputSchema.optional(),
  orderBy: z.union([ SearchPreferenceOrderByWithRelationInputSchema.array(),SearchPreferenceOrderByWithRelationInputSchema ]).optional(),
  cursor: SearchPreferenceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SearchPreferenceGroupByArgsSchema: z.ZodType<Prisma.SearchPreferenceGroupByArgs> = z.object({
  where: SearchPreferenceWhereInputSchema.optional(),
  orderBy: z.union([ SearchPreferenceOrderByWithAggregationInputSchema.array(),SearchPreferenceOrderByWithAggregationInputSchema ]).optional(),
  by: SearchPreferenceScalarFieldEnumSchema.array(),
  having: SearchPreferenceScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SearchPreferenceFindUniqueArgsSchema: z.ZodType<Prisma.SearchPreferenceFindUniqueArgs> = z.object({
  select: SearchPreferenceSelectSchema.optional(),
  include: SearchPreferenceIncludeSchema.optional(),
  where: SearchPreferenceWhereUniqueInputSchema,
}).strict() ;

export const SearchPreferenceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SearchPreferenceFindUniqueOrThrowArgs> = z.object({
  select: SearchPreferenceSelectSchema.optional(),
  include: SearchPreferenceIncludeSchema.optional(),
  where: SearchPreferenceWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ProfileCreateArgsSchema: z.ZodType<Prisma.ProfileCreateArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  data: z.union([ ProfileCreateInputSchema,ProfileUncheckedCreateInputSchema ]),
}).strict() ;

export const ProfileUpsertArgsSchema: z.ZodType<Prisma.ProfileUpsertArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  where: ProfileWhereUniqueInputSchema,
  create: z.union([ ProfileCreateInputSchema,ProfileUncheckedCreateInputSchema ]),
  update: z.union([ ProfileUpdateInputSchema,ProfileUncheckedUpdateInputSchema ]),
}).strict() ;

export const ProfileCreateManyArgsSchema: z.ZodType<Prisma.ProfileCreateManyArgs> = z.object({
  data: z.union([ ProfileCreateManyInputSchema,ProfileCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProfileCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ProfileCreateManyAndReturnArgs> = z.object({
  data: z.union([ ProfileCreateManyInputSchema,ProfileCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProfileDeleteArgsSchema: z.ZodType<Prisma.ProfileDeleteArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  where: ProfileWhereUniqueInputSchema,
}).strict() ;

export const ProfileUpdateArgsSchema: z.ZodType<Prisma.ProfileUpdateArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  data: z.union([ ProfileUpdateInputSchema,ProfileUncheckedUpdateInputSchema ]),
  where: ProfileWhereUniqueInputSchema,
}).strict() ;

export const ProfileUpdateManyArgsSchema: z.ZodType<Prisma.ProfileUpdateManyArgs> = z.object({
  data: z.union([ ProfileUpdateManyMutationInputSchema,ProfileUncheckedUpdateManyInputSchema ]),
  where: ProfileWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ProfileUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ProfileUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ProfileUpdateManyMutationInputSchema,ProfileUncheckedUpdateManyInputSchema ]),
  where: ProfileWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ProfileDeleteManyArgsSchema: z.ZodType<Prisma.ProfileDeleteManyArgs> = z.object({
  where: ProfileWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ProfileImageCreateArgsSchema: z.ZodType<Prisma.ProfileImageCreateArgs> = z.object({
  select: ProfileImageSelectSchema.optional(),
  include: ProfileImageIncludeSchema.optional(),
  data: z.union([ ProfileImageCreateInputSchema,ProfileImageUncheckedCreateInputSchema ]),
}).strict() ;

export const ProfileImageUpsertArgsSchema: z.ZodType<Prisma.ProfileImageUpsertArgs> = z.object({
  select: ProfileImageSelectSchema.optional(),
  include: ProfileImageIncludeSchema.optional(),
  where: ProfileImageWhereUniqueInputSchema,
  create: z.union([ ProfileImageCreateInputSchema,ProfileImageUncheckedCreateInputSchema ]),
  update: z.union([ ProfileImageUpdateInputSchema,ProfileImageUncheckedUpdateInputSchema ]),
}).strict() ;

export const ProfileImageCreateManyArgsSchema: z.ZodType<Prisma.ProfileImageCreateManyArgs> = z.object({
  data: z.union([ ProfileImageCreateManyInputSchema,ProfileImageCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProfileImageCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ProfileImageCreateManyAndReturnArgs> = z.object({
  data: z.union([ ProfileImageCreateManyInputSchema,ProfileImageCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProfileImageDeleteArgsSchema: z.ZodType<Prisma.ProfileImageDeleteArgs> = z.object({
  select: ProfileImageSelectSchema.optional(),
  include: ProfileImageIncludeSchema.optional(),
  where: ProfileImageWhereUniqueInputSchema,
}).strict() ;

export const ProfileImageUpdateArgsSchema: z.ZodType<Prisma.ProfileImageUpdateArgs> = z.object({
  select: ProfileImageSelectSchema.optional(),
  include: ProfileImageIncludeSchema.optional(),
  data: z.union([ ProfileImageUpdateInputSchema,ProfileImageUncheckedUpdateInputSchema ]),
  where: ProfileImageWhereUniqueInputSchema,
}).strict() ;

export const ProfileImageUpdateManyArgsSchema: z.ZodType<Prisma.ProfileImageUpdateManyArgs> = z.object({
  data: z.union([ ProfileImageUpdateManyMutationInputSchema,ProfileImageUncheckedUpdateManyInputSchema ]),
  where: ProfileImageWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ProfileImageUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ProfileImageUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ProfileImageUpdateManyMutationInputSchema,ProfileImageUncheckedUpdateManyInputSchema ]),
  where: ProfileImageWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ProfileImageDeleteManyArgsSchema: z.ZodType<Prisma.ProfileImageDeleteManyArgs> = z.object({
  where: ProfileImageWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TagCreateArgsSchema: z.ZodType<Prisma.TagCreateArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  data: z.union([ TagCreateInputSchema,TagUncheckedCreateInputSchema ]),
}).strict() ;

export const TagUpsertArgsSchema: z.ZodType<Prisma.TagUpsertArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
  create: z.union([ TagCreateInputSchema,TagUncheckedCreateInputSchema ]),
  update: z.union([ TagUpdateInputSchema,TagUncheckedUpdateInputSchema ]),
}).strict() ;

export const TagCreateManyArgsSchema: z.ZodType<Prisma.TagCreateManyArgs> = z.object({
  data: z.union([ TagCreateManyInputSchema,TagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TagCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TagCreateManyAndReturnArgs> = z.object({
  data: z.union([ TagCreateManyInputSchema,TagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TagDeleteArgsSchema: z.ZodType<Prisma.TagDeleteArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const TagUpdateArgsSchema: z.ZodType<Prisma.TagUpdateArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  data: z.union([ TagUpdateInputSchema,TagUncheckedUpdateInputSchema ]),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const TagUpdateManyArgsSchema: z.ZodType<Prisma.TagUpdateManyArgs> = z.object({
  data: z.union([ TagUpdateManyMutationInputSchema,TagUncheckedUpdateManyInputSchema ]),
  where: TagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TagUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.TagUpdateManyAndReturnArgs> = z.object({
  data: z.union([ TagUpdateManyMutationInputSchema,TagUncheckedUpdateManyInputSchema ]),
  where: TagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TagDeleteManyArgsSchema: z.ZodType<Prisma.TagDeleteManyArgs> = z.object({
  where: TagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ProfileTagCreateArgsSchema: z.ZodType<Prisma.ProfileTagCreateArgs> = z.object({
  select: ProfileTagSelectSchema.optional(),
  include: ProfileTagIncludeSchema.optional(),
  data: z.union([ ProfileTagCreateInputSchema,ProfileTagUncheckedCreateInputSchema ]),
}).strict() ;

export const ProfileTagUpsertArgsSchema: z.ZodType<Prisma.ProfileTagUpsertArgs> = z.object({
  select: ProfileTagSelectSchema.optional(),
  include: ProfileTagIncludeSchema.optional(),
  where: ProfileTagWhereUniqueInputSchema,
  create: z.union([ ProfileTagCreateInputSchema,ProfileTagUncheckedCreateInputSchema ]),
  update: z.union([ ProfileTagUpdateInputSchema,ProfileTagUncheckedUpdateInputSchema ]),
}).strict() ;

export const ProfileTagCreateManyArgsSchema: z.ZodType<Prisma.ProfileTagCreateManyArgs> = z.object({
  data: z.union([ ProfileTagCreateManyInputSchema,ProfileTagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProfileTagCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ProfileTagCreateManyAndReturnArgs> = z.object({
  data: z.union([ ProfileTagCreateManyInputSchema,ProfileTagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProfileTagDeleteArgsSchema: z.ZodType<Prisma.ProfileTagDeleteArgs> = z.object({
  select: ProfileTagSelectSchema.optional(),
  include: ProfileTagIncludeSchema.optional(),
  where: ProfileTagWhereUniqueInputSchema,
}).strict() ;

export const ProfileTagUpdateArgsSchema: z.ZodType<Prisma.ProfileTagUpdateArgs> = z.object({
  select: ProfileTagSelectSchema.optional(),
  include: ProfileTagIncludeSchema.optional(),
  data: z.union([ ProfileTagUpdateInputSchema,ProfileTagUncheckedUpdateInputSchema ]),
  where: ProfileTagWhereUniqueInputSchema,
}).strict() ;

export const ProfileTagUpdateManyArgsSchema: z.ZodType<Prisma.ProfileTagUpdateManyArgs> = z.object({
  data: z.union([ ProfileTagUpdateManyMutationInputSchema,ProfileTagUncheckedUpdateManyInputSchema ]),
  where: ProfileTagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ProfileTagUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ProfileTagUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ProfileTagUpdateManyMutationInputSchema,ProfileTagUncheckedUpdateManyInputSchema ]),
  where: ProfileTagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ProfileTagDeleteManyArgsSchema: z.ZodType<Prisma.ProfileTagDeleteManyArgs> = z.object({
  where: ProfileTagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SearchPreferenceCreateArgsSchema: z.ZodType<Prisma.SearchPreferenceCreateArgs> = z.object({
  select: SearchPreferenceSelectSchema.optional(),
  include: SearchPreferenceIncludeSchema.optional(),
  data: z.union([ SearchPreferenceCreateInputSchema,SearchPreferenceUncheckedCreateInputSchema ]),
}).strict() ;

export const SearchPreferenceUpsertArgsSchema: z.ZodType<Prisma.SearchPreferenceUpsertArgs> = z.object({
  select: SearchPreferenceSelectSchema.optional(),
  include: SearchPreferenceIncludeSchema.optional(),
  where: SearchPreferenceWhereUniqueInputSchema,
  create: z.union([ SearchPreferenceCreateInputSchema,SearchPreferenceUncheckedCreateInputSchema ]),
  update: z.union([ SearchPreferenceUpdateInputSchema,SearchPreferenceUncheckedUpdateInputSchema ]),
}).strict() ;

export const SearchPreferenceCreateManyArgsSchema: z.ZodType<Prisma.SearchPreferenceCreateManyArgs> = z.object({
  data: z.union([ SearchPreferenceCreateManyInputSchema,SearchPreferenceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SearchPreferenceCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SearchPreferenceCreateManyAndReturnArgs> = z.object({
  data: z.union([ SearchPreferenceCreateManyInputSchema,SearchPreferenceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SearchPreferenceDeleteArgsSchema: z.ZodType<Prisma.SearchPreferenceDeleteArgs> = z.object({
  select: SearchPreferenceSelectSchema.optional(),
  include: SearchPreferenceIncludeSchema.optional(),
  where: SearchPreferenceWhereUniqueInputSchema,
}).strict() ;

export const SearchPreferenceUpdateArgsSchema: z.ZodType<Prisma.SearchPreferenceUpdateArgs> = z.object({
  select: SearchPreferenceSelectSchema.optional(),
  include: SearchPreferenceIncludeSchema.optional(),
  data: z.union([ SearchPreferenceUpdateInputSchema,SearchPreferenceUncheckedUpdateInputSchema ]),
  where: SearchPreferenceWhereUniqueInputSchema,
}).strict() ;

export const SearchPreferenceUpdateManyArgsSchema: z.ZodType<Prisma.SearchPreferenceUpdateManyArgs> = z.object({
  data: z.union([ SearchPreferenceUpdateManyMutationInputSchema,SearchPreferenceUncheckedUpdateManyInputSchema ]),
  where: SearchPreferenceWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SearchPreferenceUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.SearchPreferenceUpdateManyAndReturnArgs> = z.object({
  data: z.union([ SearchPreferenceUpdateManyMutationInputSchema,SearchPreferenceUncheckedUpdateManyInputSchema ]),
  where: SearchPreferenceWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SearchPreferenceDeleteManyArgsSchema: z.ZodType<Prisma.SearchPreferenceDeleteManyArgs> = z.object({
  where: SearchPreferenceWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;
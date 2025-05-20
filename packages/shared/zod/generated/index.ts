import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const TagScalarFieldEnumSchema = z.enum(['id','name','scope','createdAt']);

export const ProfileTagScalarFieldEnumSchema = z.enum(['id','tagId','profileId']);

export const DatingProfileTagScalarFieldEnumSchema = z.enum(['id','tagId','datingProfileId']);

export const DatingPreferenceScalarFieldEnumSchema = z.enum(['userId','prefGender','prefAgeMin','prefAgeMax']);

export const ConnectionRequestScalarFieldEnumSchema = z.enum(['id','fromUserId','toUserId','scope','status','createdAt']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','tokenVersion','loginToken','loginTokenExp','isActive','isBlocked','isRegistrationConfirmed','createdAt','updatedAt','lastLoginAt','language','lookingFor','latitude','longitude']);

export const ProfileScalarFieldEnumSchema = z.enum(['id','publicName','intro','country','city','isActive','isReported','isBlocked','userId','profileImageId','createdAt','updatedAt']);

export const DatingProfileScalarFieldEnumSchema = z.enum(['id','publicName','intro','country','city','birthday','gender','relationship','hasKids','isActive','isReported','isBlocked','createdAt','updatedAt','userId','profileImageId']);

export const ProfileImageScalarFieldEnumSchema = z.enum(['id','mimeType','userId','altText','storagePath','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const ConnectionTypeSchema = z.enum(['friend','dating']);

export type ConnectionTypeType = `${z.infer<typeof ConnectionTypeSchema>}`

export const ConnectionStatusSchema = z.enum(['pending','accepted','rejected','blocked']);

export type ConnectionStatusType = `${z.infer<typeof ConnectionStatusSchema>}`

export const GenderSchema = z.enum(['male','female','non_binary','other','unspecified']);

export type GenderType = `${z.infer<typeof GenderSchema>}`

export const PreferenceGenderSchema = z.enum(['male','female','non_binary','any']);

export type PreferenceGenderType = `${z.infer<typeof PreferenceGenderSchema>}`

export const RelationshipStatusSchema = z.enum(['single','in_relationship','married','other','unspecified']);

export type RelationshipStatusType = `${z.infer<typeof RelationshipStatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// TAG SCHEMA
/////////////////////////////////////////

export const TagSchema = z.object({
  scope: ConnectionTypeSchema,
  id: z.number().int(),
  name: z.string(),
  createdAt: z.coerce.date(),
})

export type Tag = z.infer<typeof TagSchema>

/////////////////////////////////////////
// PROFILE TAG SCHEMA
/////////////////////////////////////////

export const ProfileTagSchema = z.object({
  id: z.string().cuid(),
  tagId: z.number().int(),
  profileId: z.string(),
})

export type ProfileTag = z.infer<typeof ProfileTagSchema>

/////////////////////////////////////////
// DATING PROFILE TAG SCHEMA
/////////////////////////////////////////

export const DatingProfileTagSchema = z.object({
  id: z.string().cuid(),
  tagId: z.number().int(),
  datingProfileId: z.string(),
})

export type DatingProfileTag = z.infer<typeof DatingProfileTagSchema>

/////////////////////////////////////////
// DATING PREFERENCE SCHEMA
/////////////////////////////////////////

export const DatingPreferenceSchema = z.object({
  prefGender: PreferenceGenderSchema,
  userId: z.string(),
  prefAgeMin: z.number().int().nullable(),
  prefAgeMax: z.number().int().nullable(),
})

export type DatingPreference = z.infer<typeof DatingPreferenceSchema>

/////////////////////////////////////////
// CONNECTION REQUEST SCHEMA
/////////////////////////////////////////

export const ConnectionRequestSchema = z.object({
  scope: ConnectionTypeSchema,
  status: ConnectionStatusSchema,
  id: z.string().cuid(),
  fromUserId: z.string(),
  toUserId: z.string(),
  createdAt: z.coerce.date(),
})

export type ConnectionRequest = z.infer<typeof ConnectionRequestSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  lookingFor: ConnectionTypeSchema.array(),
  id: z.string().cuid(),
  email: z.string(),
  tokenVersion: z.number().int(),
  loginToken: z.string().nullable(),
  loginTokenExp: z.coerce.date().nullable(),
  isActive: z.boolean(),
  isBlocked: z.boolean(),
  isRegistrationConfirmed: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  lastLoginAt: z.coerce.date().nullable(),
  language: z.string().nullable(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// PROFILE SCHEMA
/////////////////////////////////////////

export const ProfileSchema = z.object({
  id: z.string().cuid(),
  publicName: z.string(),
  intro: z.string(),
  country: z.string(),
  city: z.string(),
  isActive: z.boolean(),
  isReported: z.boolean(),
  isBlocked: z.boolean(),
  userId: z.string(),
  profileImageId: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Profile = z.infer<typeof ProfileSchema>

/////////////////////////////////////////
// DATING PROFILE SCHEMA
/////////////////////////////////////////

export const DatingProfileSchema = z.object({
  gender: GenderSchema,
  relationship: RelationshipStatusSchema,
  id: z.string().cuid(),
  publicName: z.string(),
  intro: z.string(),
  country: z.string(),
  city: z.string(),
  birthday: z.coerce.date().nullable(),
  hasKids: z.boolean().nullable(),
  isActive: z.boolean(),
  isReported: z.boolean(),
  isBlocked: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
  profileImageId: z.string().nullable(),
})

export type DatingProfile = z.infer<typeof DatingProfileSchema>

/////////////////////////////////////////
// PROFILE IMAGE SCHEMA
/////////////////////////////////////////

export const ProfileImageSchema = z.object({
  id: z.string().cuid(),
  mimeType: z.string(),
  userId: z.string(),
  altText: z.string().nullable(),
  storagePath: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type ProfileImage = z.infer<typeof ProfileImageSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// TAG
//------------------------------------------------------

export const TagIncludeSchema: z.ZodType<Prisma.TagInclude> = z.object({
  profileTags: z.union([z.boolean(),z.lazy(() => ProfileTagFindManyArgsSchema)]).optional(),
  datingProfileTag: z.union([z.boolean(),z.lazy(() => DatingProfileTagFindManyArgsSchema)]).optional(),
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
  profileTags: z.boolean().optional(),
  datingProfileTag: z.boolean().optional(),
}).strict();

export const TagSelectSchema: z.ZodType<Prisma.TagSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  scope: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  profileTags: z.union([z.boolean(),z.lazy(() => ProfileTagFindManyArgsSchema)]).optional(),
  datingProfileTag: z.union([z.boolean(),z.lazy(() => DatingProfileTagFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TagCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PROFILE TAG
//------------------------------------------------------

export const ProfileTagIncludeSchema: z.ZodType<Prisma.ProfileTagInclude> = z.object({
  tag: z.union([z.boolean(),z.lazy(() => TagArgsSchema)]).optional(),
  profile: z.union([z.boolean(),z.lazy(() => ProfileArgsSchema)]).optional(),
}).strict()

export const ProfileTagArgsSchema: z.ZodType<Prisma.ProfileTagDefaultArgs> = z.object({
  select: z.lazy(() => ProfileTagSelectSchema).optional(),
  include: z.lazy(() => ProfileTagIncludeSchema).optional(),
}).strict();

export const ProfileTagSelectSchema: z.ZodType<Prisma.ProfileTagSelect> = z.object({
  id: z.boolean().optional(),
  tagId: z.boolean().optional(),
  profileId: z.boolean().optional(),
  tag: z.union([z.boolean(),z.lazy(() => TagArgsSchema)]).optional(),
  profile: z.union([z.boolean(),z.lazy(() => ProfileArgsSchema)]).optional(),
}).strict()

// DATING PROFILE TAG
//------------------------------------------------------

export const DatingProfileTagIncludeSchema: z.ZodType<Prisma.DatingProfileTagInclude> = z.object({
  tag: z.union([z.boolean(),z.lazy(() => TagArgsSchema)]).optional(),
  datingProfile: z.union([z.boolean(),z.lazy(() => DatingProfileArgsSchema)]).optional(),
}).strict()

export const DatingProfileTagArgsSchema: z.ZodType<Prisma.DatingProfileTagDefaultArgs> = z.object({
  select: z.lazy(() => DatingProfileTagSelectSchema).optional(),
  include: z.lazy(() => DatingProfileTagIncludeSchema).optional(),
}).strict();

export const DatingProfileTagSelectSchema: z.ZodType<Prisma.DatingProfileTagSelect> = z.object({
  id: z.boolean().optional(),
  tagId: z.boolean().optional(),
  datingProfileId: z.boolean().optional(),
  tag: z.union([z.boolean(),z.lazy(() => TagArgsSchema)]).optional(),
  datingProfile: z.union([z.boolean(),z.lazy(() => DatingProfileArgsSchema)]).optional(),
}).strict()

// DATING PREFERENCE
//------------------------------------------------------

export const DatingPreferenceIncludeSchema: z.ZodType<Prisma.DatingPreferenceInclude> = z.object({
  profile: z.union([z.boolean(),z.lazy(() => DatingProfileArgsSchema)]).optional(),
}).strict()

export const DatingPreferenceArgsSchema: z.ZodType<Prisma.DatingPreferenceDefaultArgs> = z.object({
  select: z.lazy(() => DatingPreferenceSelectSchema).optional(),
  include: z.lazy(() => DatingPreferenceIncludeSchema).optional(),
}).strict();

export const DatingPreferenceSelectSchema: z.ZodType<Prisma.DatingPreferenceSelect> = z.object({
  userId: z.boolean().optional(),
  prefGender: z.boolean().optional(),
  prefAgeMin: z.boolean().optional(),
  prefAgeMax: z.boolean().optional(),
  profile: z.union([z.boolean(),z.lazy(() => DatingProfileArgsSchema)]).optional(),
}).strict()

// CONNECTION REQUEST
//------------------------------------------------------

export const ConnectionRequestIncludeSchema: z.ZodType<Prisma.ConnectionRequestInclude> = z.object({
  fromUser: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  toUser: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const ConnectionRequestArgsSchema: z.ZodType<Prisma.ConnectionRequestDefaultArgs> = z.object({
  select: z.lazy(() => ConnectionRequestSelectSchema).optional(),
  include: z.lazy(() => ConnectionRequestIncludeSchema).optional(),
}).strict();

export const ConnectionRequestSelectSchema: z.ZodType<Prisma.ConnectionRequestSelect> = z.object({
  id: z.boolean().optional(),
  fromUserId: z.boolean().optional(),
  toUserId: z.boolean().optional(),
  scope: z.boolean().optional(),
  status: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  fromUser: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  toUser: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  profile: z.union([z.boolean(),z.lazy(() => ProfileArgsSchema)]).optional(),
  datingProfile: z.union([z.boolean(),z.lazy(() => DatingProfileArgsSchema)]).optional(),
  ProfileImage: z.union([z.boolean(),z.lazy(() => ProfileImageFindManyArgsSchema)]).optional(),
  requestsSent: z.union([z.boolean(),z.lazy(() => ConnectionRequestFindManyArgsSchema)]).optional(),
  requestsReceived: z.union([z.boolean(),z.lazy(() => ConnectionRequestFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  ProfileImage: z.boolean().optional(),
  requestsSent: z.boolean().optional(),
  requestsReceived: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  tokenVersion: z.boolean().optional(),
  loginToken: z.boolean().optional(),
  loginTokenExp: z.boolean().optional(),
  isActive: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  isRegistrationConfirmed: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  lastLoginAt: z.boolean().optional(),
  language: z.boolean().optional(),
  lookingFor: z.boolean().optional(),
  latitude: z.boolean().optional(),
  longitude: z.boolean().optional(),
  profile: z.union([z.boolean(),z.lazy(() => ProfileArgsSchema)]).optional(),
  datingProfile: z.union([z.boolean(),z.lazy(() => DatingProfileArgsSchema)]).optional(),
  ProfileImage: z.union([z.boolean(),z.lazy(() => ProfileImageFindManyArgsSchema)]).optional(),
  requestsSent: z.union([z.boolean(),z.lazy(() => ConnectionRequestFindManyArgsSchema)]).optional(),
  requestsReceived: z.union([z.boolean(),z.lazy(() => ConnectionRequestFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PROFILE
//------------------------------------------------------

export const ProfileIncludeSchema: z.ZodType<Prisma.ProfileInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => ProfileTagFindManyArgsSchema)]).optional(),
  profileImage: z.union([z.boolean(),z.lazy(() => ProfileImageArgsSchema)]).optional(),
  otherImages: z.union([z.boolean(),z.lazy(() => ProfileImageFindManyArgsSchema)]).optional(),
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
  tags: z.boolean().optional(),
  otherImages: z.boolean().optional(),
}).strict();

export const ProfileSelectSchema: z.ZodType<Prisma.ProfileSelect> = z.object({
  id: z.boolean().optional(),
  publicName: z.boolean().optional(),
  intro: z.boolean().optional(),
  country: z.boolean().optional(),
  city: z.boolean().optional(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  userId: z.boolean().optional(),
  profileImageId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => ProfileTagFindManyArgsSchema)]).optional(),
  profileImage: z.union([z.boolean(),z.lazy(() => ProfileImageArgsSchema)]).optional(),
  otherImages: z.union([z.boolean(),z.lazy(() => ProfileImageFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProfileCountOutputTypeArgsSchema)]).optional(),
}).strict()

// DATING PROFILE
//------------------------------------------------------

export const DatingProfileIncludeSchema: z.ZodType<Prisma.DatingProfileInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  datingPreference: z.union([z.boolean(),z.lazy(() => DatingPreferenceArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => DatingProfileTagFindManyArgsSchema)]).optional(),
  profileImage: z.union([z.boolean(),z.lazy(() => ProfileImageArgsSchema)]).optional(),
  otherImages: z.union([z.boolean(),z.lazy(() => ProfileImageFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DatingProfileCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const DatingProfileArgsSchema: z.ZodType<Prisma.DatingProfileDefaultArgs> = z.object({
  select: z.lazy(() => DatingProfileSelectSchema).optional(),
  include: z.lazy(() => DatingProfileIncludeSchema).optional(),
}).strict();

export const DatingProfileCountOutputTypeArgsSchema: z.ZodType<Prisma.DatingProfileCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => DatingProfileCountOutputTypeSelectSchema).nullish(),
}).strict();

export const DatingProfileCountOutputTypeSelectSchema: z.ZodType<Prisma.DatingProfileCountOutputTypeSelect> = z.object({
  tags: z.boolean().optional(),
  otherImages: z.boolean().optional(),
}).strict();

export const DatingProfileSelectSchema: z.ZodType<Prisma.DatingProfileSelect> = z.object({
  id: z.boolean().optional(),
  publicName: z.boolean().optional(),
  intro: z.boolean().optional(),
  country: z.boolean().optional(),
  city: z.boolean().optional(),
  birthday: z.boolean().optional(),
  gender: z.boolean().optional(),
  relationship: z.boolean().optional(),
  hasKids: z.boolean().optional(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  profileImageId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  datingPreference: z.union([z.boolean(),z.lazy(() => DatingPreferenceArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => DatingProfileTagFindManyArgsSchema)]).optional(),
  profileImage: z.union([z.boolean(),z.lazy(() => ProfileImageArgsSchema)]).optional(),
  otherImages: z.union([z.boolean(),z.lazy(() => ProfileImageFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DatingProfileCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PROFILE IMAGE
//------------------------------------------------------

export const ProfileImageIncludeSchema: z.ZodType<Prisma.ProfileImageInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  primaryForProfile: z.union([z.boolean(),z.lazy(() => ProfileArgsSchema)]).optional(),
  otherForProfiles: z.union([z.boolean(),z.lazy(() => ProfileFindManyArgsSchema)]).optional(),
  primaryForDatingProfile: z.union([z.boolean(),z.lazy(() => DatingProfileArgsSchema)]).optional(),
  otherForDatingProfiles: z.union([z.boolean(),z.lazy(() => DatingProfileFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProfileImageCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ProfileImageArgsSchema: z.ZodType<Prisma.ProfileImageDefaultArgs> = z.object({
  select: z.lazy(() => ProfileImageSelectSchema).optional(),
  include: z.lazy(() => ProfileImageIncludeSchema).optional(),
}).strict();

export const ProfileImageCountOutputTypeArgsSchema: z.ZodType<Prisma.ProfileImageCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ProfileImageCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ProfileImageCountOutputTypeSelectSchema: z.ZodType<Prisma.ProfileImageCountOutputTypeSelect> = z.object({
  otherForProfiles: z.boolean().optional(),
  otherForDatingProfiles: z.boolean().optional(),
}).strict();

export const ProfileImageSelectSchema: z.ZodType<Prisma.ProfileImageSelect> = z.object({
  id: z.boolean().optional(),
  mimeType: z.boolean().optional(),
  userId: z.boolean().optional(),
  altText: z.boolean().optional(),
  storagePath: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  primaryForProfile: z.union([z.boolean(),z.lazy(() => ProfileArgsSchema)]).optional(),
  otherForProfiles: z.union([z.boolean(),z.lazy(() => ProfileFindManyArgsSchema)]).optional(),
  primaryForDatingProfile: z.union([z.boolean(),z.lazy(() => DatingProfileArgsSchema)]).optional(),
  otherForDatingProfiles: z.union([z.boolean(),z.lazy(() => DatingProfileFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProfileImageCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const TagWhereInputSchema: z.ZodType<Prisma.TagWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  scope: z.union([ z.lazy(() => EnumConnectionTypeFilterSchema),z.lazy(() => ConnectionTypeSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  profileTags: z.lazy(() => ProfileTagListRelationFilterSchema).optional(),
  datingProfileTag: z.lazy(() => DatingProfileTagListRelationFilterSchema).optional()
}).strict();

export const TagOrderByWithRelationInputSchema: z.ZodType<Prisma.TagOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  profileTags: z.lazy(() => ProfileTagOrderByRelationAggregateInputSchema).optional(),
  datingProfileTag: z.lazy(() => DatingProfileTagOrderByRelationAggregateInputSchema).optional()
}).strict();

export const TagWhereUniqueInputSchema: z.ZodType<Prisma.TagWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    name: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  scope: z.union([ z.lazy(() => EnumConnectionTypeFilterSchema),z.lazy(() => ConnectionTypeSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  profileTags: z.lazy(() => ProfileTagListRelationFilterSchema).optional(),
  datingProfileTag: z.lazy(() => DatingProfileTagListRelationFilterSchema).optional()
}).strict());

export const TagOrderByWithAggregationInputSchema: z.ZodType<Prisma.TagOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TagCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TagAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TagMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TagMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TagSumOrderByAggregateInputSchema).optional()
}).strict();

export const TagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TagScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TagScalarWhereWithAggregatesInputSchema),z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagScalarWhereWithAggregatesInputSchema),z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  scope: z.union([ z.lazy(() => EnumConnectionTypeWithAggregatesFilterSchema),z.lazy(() => ConnectionTypeSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ProfileTagWhereInputSchema: z.ZodType<Prisma.ProfileTagWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProfileTagWhereInputSchema),z.lazy(() => ProfileTagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfileTagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfileTagWhereInputSchema),z.lazy(() => ProfileTagWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tagId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  profileId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tag: z.union([ z.lazy(() => TagScalarRelationFilterSchema),z.lazy(() => TagWhereInputSchema) ]).optional(),
  profile: z.union([ z.lazy(() => ProfileScalarRelationFilterSchema),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
}).strict();

export const ProfileTagOrderByWithRelationInputSchema: z.ZodType<Prisma.ProfileTagOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional(),
  tag: z.lazy(() => TagOrderByWithRelationInputSchema).optional(),
  profile: z.lazy(() => ProfileOrderByWithRelationInputSchema).optional()
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
  tagId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  profileId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tag: z.union([ z.lazy(() => TagScalarRelationFilterSchema),z.lazy(() => TagWhereInputSchema) ]).optional(),
  profile: z.union([ z.lazy(() => ProfileScalarRelationFilterSchema),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
}).strict());

export const ProfileTagOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProfileTagOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProfileTagCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ProfileTagAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProfileTagMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProfileTagMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ProfileTagSumOrderByAggregateInputSchema).optional()
}).strict();

export const ProfileTagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProfileTagScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProfileTagScalarWhereWithAggregatesInputSchema),z.lazy(() => ProfileTagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfileTagScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfileTagScalarWhereWithAggregatesInputSchema),z.lazy(() => ProfileTagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tagId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  profileId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const DatingProfileTagWhereInputSchema: z.ZodType<Prisma.DatingProfileTagWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DatingProfileTagWhereInputSchema),z.lazy(() => DatingProfileTagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DatingProfileTagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DatingProfileTagWhereInputSchema),z.lazy(() => DatingProfileTagWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tagId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  datingProfileId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tag: z.union([ z.lazy(() => TagScalarRelationFilterSchema),z.lazy(() => TagWhereInputSchema) ]).optional(),
  datingProfile: z.union([ z.lazy(() => DatingProfileScalarRelationFilterSchema),z.lazy(() => DatingProfileWhereInputSchema) ]).optional(),
}).strict();

export const DatingProfileTagOrderByWithRelationInputSchema: z.ZodType<Prisma.DatingProfileTagOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional(),
  datingProfileId: z.lazy(() => SortOrderSchema).optional(),
  tag: z.lazy(() => TagOrderByWithRelationInputSchema).optional(),
  datingProfile: z.lazy(() => DatingProfileOrderByWithRelationInputSchema).optional()
}).strict();

export const DatingProfileTagWhereUniqueInputSchema: z.ZodType<Prisma.DatingProfileTagWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    datingProfileId_tagId: z.lazy(() => DatingProfileTagDatingProfileIdTagIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    datingProfileId_tagId: z.lazy(() => DatingProfileTagDatingProfileIdTagIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  datingProfileId_tagId: z.lazy(() => DatingProfileTagDatingProfileIdTagIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => DatingProfileTagWhereInputSchema),z.lazy(() => DatingProfileTagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DatingProfileTagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DatingProfileTagWhereInputSchema),z.lazy(() => DatingProfileTagWhereInputSchema).array() ]).optional(),
  tagId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  datingProfileId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tag: z.union([ z.lazy(() => TagScalarRelationFilterSchema),z.lazy(() => TagWhereInputSchema) ]).optional(),
  datingProfile: z.union([ z.lazy(() => DatingProfileScalarRelationFilterSchema),z.lazy(() => DatingProfileWhereInputSchema) ]).optional(),
}).strict());

export const DatingProfileTagOrderByWithAggregationInputSchema: z.ZodType<Prisma.DatingProfileTagOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional(),
  datingProfileId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => DatingProfileTagCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => DatingProfileTagAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DatingProfileTagMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DatingProfileTagMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => DatingProfileTagSumOrderByAggregateInputSchema).optional()
}).strict();

export const DatingProfileTagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DatingProfileTagScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => DatingProfileTagScalarWhereWithAggregatesInputSchema),z.lazy(() => DatingProfileTagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DatingProfileTagScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DatingProfileTagScalarWhereWithAggregatesInputSchema),z.lazy(() => DatingProfileTagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tagId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  datingProfileId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const DatingPreferenceWhereInputSchema: z.ZodType<Prisma.DatingPreferenceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DatingPreferenceWhereInputSchema),z.lazy(() => DatingPreferenceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DatingPreferenceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DatingPreferenceWhereInputSchema),z.lazy(() => DatingPreferenceWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  prefGender: z.union([ z.lazy(() => EnumPreferenceGenderFilterSchema),z.lazy(() => PreferenceGenderSchema) ]).optional(),
  prefAgeMin: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  prefAgeMax: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  profile: z.union([ z.lazy(() => DatingProfileScalarRelationFilterSchema),z.lazy(() => DatingProfileWhereInputSchema) ]).optional(),
}).strict();

export const DatingPreferenceOrderByWithRelationInputSchema: z.ZodType<Prisma.DatingPreferenceOrderByWithRelationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  prefGender: z.lazy(() => SortOrderSchema).optional(),
  prefAgeMin: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  prefAgeMax: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  profile: z.lazy(() => DatingProfileOrderByWithRelationInputSchema).optional()
}).strict();

export const DatingPreferenceWhereUniqueInputSchema: z.ZodType<Prisma.DatingPreferenceWhereUniqueInput> = z.object({
  userId: z.string()
})
.and(z.object({
  userId: z.string().optional(),
  AND: z.union([ z.lazy(() => DatingPreferenceWhereInputSchema),z.lazy(() => DatingPreferenceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DatingPreferenceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DatingPreferenceWhereInputSchema),z.lazy(() => DatingPreferenceWhereInputSchema).array() ]).optional(),
  prefGender: z.union([ z.lazy(() => EnumPreferenceGenderFilterSchema),z.lazy(() => PreferenceGenderSchema) ]).optional(),
  prefAgeMin: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  prefAgeMax: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  profile: z.union([ z.lazy(() => DatingProfileScalarRelationFilterSchema),z.lazy(() => DatingProfileWhereInputSchema) ]).optional(),
}).strict());

export const DatingPreferenceOrderByWithAggregationInputSchema: z.ZodType<Prisma.DatingPreferenceOrderByWithAggregationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  prefGender: z.lazy(() => SortOrderSchema).optional(),
  prefAgeMin: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  prefAgeMax: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => DatingPreferenceCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => DatingPreferenceAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DatingPreferenceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DatingPreferenceMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => DatingPreferenceSumOrderByAggregateInputSchema).optional()
}).strict();

export const DatingPreferenceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DatingPreferenceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => DatingPreferenceScalarWhereWithAggregatesInputSchema),z.lazy(() => DatingPreferenceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DatingPreferenceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DatingPreferenceScalarWhereWithAggregatesInputSchema),z.lazy(() => DatingPreferenceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  prefGender: z.union([ z.lazy(() => EnumPreferenceGenderWithAggregatesFilterSchema),z.lazy(() => PreferenceGenderSchema) ]).optional(),
  prefAgeMin: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  prefAgeMax: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const ConnectionRequestWhereInputSchema: z.ZodType<Prisma.ConnectionRequestWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ConnectionRequestWhereInputSchema),z.lazy(() => ConnectionRequestWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ConnectionRequestWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ConnectionRequestWhereInputSchema),z.lazy(() => ConnectionRequestWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fromUserId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  toUserId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  scope: z.union([ z.lazy(() => EnumConnectionTypeFilterSchema),z.lazy(() => ConnectionTypeSchema) ]).optional(),
  status: z.union([ z.lazy(() => EnumConnectionStatusFilterSchema),z.lazy(() => ConnectionStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  fromUser: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  toUser: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const ConnectionRequestOrderByWithRelationInputSchema: z.ZodType<Prisma.ConnectionRequestOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fromUserId: z.lazy(() => SortOrderSchema).optional(),
  toUserId: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  fromUser: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  toUser: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const ConnectionRequestWhereUniqueInputSchema: z.ZodType<Prisma.ConnectionRequestWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    fromUserId_toUserId_scope: z.lazy(() => ConnectionRequestFromUserIdToUserIdScopeCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    fromUserId_toUserId_scope: z.lazy(() => ConnectionRequestFromUserIdToUserIdScopeCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  fromUserId_toUserId_scope: z.lazy(() => ConnectionRequestFromUserIdToUserIdScopeCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => ConnectionRequestWhereInputSchema),z.lazy(() => ConnectionRequestWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ConnectionRequestWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ConnectionRequestWhereInputSchema),z.lazy(() => ConnectionRequestWhereInputSchema).array() ]).optional(),
  fromUserId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  toUserId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  scope: z.union([ z.lazy(() => EnumConnectionTypeFilterSchema),z.lazy(() => ConnectionTypeSchema) ]).optional(),
  status: z.union([ z.lazy(() => EnumConnectionStatusFilterSchema),z.lazy(() => ConnectionStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  fromUser: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  toUser: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const ConnectionRequestOrderByWithAggregationInputSchema: z.ZodType<Prisma.ConnectionRequestOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fromUserId: z.lazy(() => SortOrderSchema).optional(),
  toUserId: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ConnectionRequestCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ConnectionRequestMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ConnectionRequestMinOrderByAggregateInputSchema).optional()
}).strict();

export const ConnectionRequestScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ConnectionRequestScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ConnectionRequestScalarWhereWithAggregatesInputSchema),z.lazy(() => ConnectionRequestScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ConnectionRequestScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ConnectionRequestScalarWhereWithAggregatesInputSchema),z.lazy(() => ConnectionRequestScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  fromUserId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  toUserId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  scope: z.union([ z.lazy(() => EnumConnectionTypeWithAggregatesFilterSchema),z.lazy(() => ConnectionTypeSchema) ]).optional(),
  status: z.union([ z.lazy(() => EnumConnectionStatusWithAggregatesFilterSchema),z.lazy(() => ConnectionStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tokenVersion: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  loginToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  loginTokenExp: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isBlocked: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isRegistrationConfirmed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  lastLoginAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  language: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  lookingFor: z.lazy(() => EnumConnectionTypeNullableListFilterSchema).optional(),
  latitude: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  longitude: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  profile: z.union([ z.lazy(() => ProfileNullableScalarRelationFilterSchema),z.lazy(() => ProfileWhereInputSchema) ]).optional().nullable(),
  datingProfile: z.union([ z.lazy(() => DatingProfileNullableScalarRelationFilterSchema),z.lazy(() => DatingProfileWhereInputSchema) ]).optional().nullable(),
  ProfileImage: z.lazy(() => ProfileImageListRelationFilterSchema).optional(),
  requestsSent: z.lazy(() => ConnectionRequestListRelationFilterSchema).optional(),
  requestsReceived: z.lazy(() => ConnectionRequestListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  tokenVersion: z.lazy(() => SortOrderSchema).optional(),
  loginToken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  loginTokenExp: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  isBlocked: z.lazy(() => SortOrderSchema).optional(),
  isRegistrationConfirmed: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  lastLoginAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  language: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  lookingFor: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  longitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  profile: z.lazy(() => ProfileOrderByWithRelationInputSchema).optional(),
  datingProfile: z.lazy(() => DatingProfileOrderByWithRelationInputSchema).optional(),
  ProfileImage: z.lazy(() => ProfileImageOrderByRelationAggregateInputSchema).optional(),
  requestsSent: z.lazy(() => ConnectionRequestOrderByRelationAggregateInputSchema).optional(),
  requestsReceived: z.lazy(() => ConnectionRequestOrderByRelationAggregateInputSchema).optional()
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
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isBlocked: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isRegistrationConfirmed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  lastLoginAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  language: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  lookingFor: z.lazy(() => EnumConnectionTypeNullableListFilterSchema).optional(),
  latitude: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  longitude: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  profile: z.union([ z.lazy(() => ProfileNullableScalarRelationFilterSchema),z.lazy(() => ProfileWhereInputSchema) ]).optional().nullable(),
  datingProfile: z.union([ z.lazy(() => DatingProfileNullableScalarRelationFilterSchema),z.lazy(() => DatingProfileWhereInputSchema) ]).optional().nullable(),
  ProfileImage: z.lazy(() => ProfileImageListRelationFilterSchema).optional(),
  requestsSent: z.lazy(() => ConnectionRequestListRelationFilterSchema).optional(),
  requestsReceived: z.lazy(() => ConnectionRequestListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  tokenVersion: z.lazy(() => SortOrderSchema).optional(),
  loginToken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  loginTokenExp: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  isBlocked: z.lazy(() => SortOrderSchema).optional(),
  isRegistrationConfirmed: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  lastLoginAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  language: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  lookingFor: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  longitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
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
  isActive: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  isBlocked: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  isRegistrationConfirmed: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  lastLoginAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  language: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  lookingFor: z.lazy(() => EnumConnectionTypeNullableListFilterSchema).optional(),
  latitude: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  longitude: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
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
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isReported: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isBlocked: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  profileImageId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  tags: z.lazy(() => ProfileTagListRelationFilterSchema).optional(),
  profileImage: z.union([ z.lazy(() => ProfileImageNullableScalarRelationFilterSchema),z.lazy(() => ProfileImageWhereInputSchema) ]).optional().nullable(),
  otherImages: z.lazy(() => ProfileImageListRelationFilterSchema).optional()
}).strict();

export const ProfileOrderByWithRelationInputSchema: z.ZodType<Prisma.ProfileOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  publicName: z.lazy(() => SortOrderSchema).optional(),
  intro: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  isReported: z.lazy(() => SortOrderSchema).optional(),
  isBlocked: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  profileImageId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  tags: z.lazy(() => ProfileTagOrderByRelationAggregateInputSchema).optional(),
  profileImage: z.lazy(() => ProfileImageOrderByWithRelationInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ProfileWhereUniqueInputSchema: z.ZodType<Prisma.ProfileWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    userId: z.string(),
    profileImageId: z.string()
  }),
  z.object({
    id: z.string().cuid(),
    userId: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
    profileImageId: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    userId: z.string(),
    profileImageId: z.string(),
  }),
  z.object({
    userId: z.string(),
  }),
  z.object({
    profileImageId: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  userId: z.string().optional(),
  profileImageId: z.string().optional(),
  AND: z.union([ z.lazy(() => ProfileWhereInputSchema),z.lazy(() => ProfileWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfileWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfileWhereInputSchema),z.lazy(() => ProfileWhereInputSchema).array() ]).optional(),
  publicName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  intro: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  country: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isReported: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isBlocked: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  tags: z.lazy(() => ProfileTagListRelationFilterSchema).optional(),
  profileImage: z.union([ z.lazy(() => ProfileImageNullableScalarRelationFilterSchema),z.lazy(() => ProfileImageWhereInputSchema) ]).optional().nullable(),
  otherImages: z.lazy(() => ProfileImageListRelationFilterSchema).optional()
}).strict());

export const ProfileOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProfileOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  publicName: z.lazy(() => SortOrderSchema).optional(),
  intro: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  isReported: z.lazy(() => SortOrderSchema).optional(),
  isBlocked: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  profileImageId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProfileCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProfileMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProfileMinOrderByAggregateInputSchema).optional()
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
  isActive: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  isReported: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  isBlocked: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  profileImageId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const DatingProfileWhereInputSchema: z.ZodType<Prisma.DatingProfileWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DatingProfileWhereInputSchema),z.lazy(() => DatingProfileWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DatingProfileWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DatingProfileWhereInputSchema),z.lazy(() => DatingProfileWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  publicName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  intro: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  country: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  birthday: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  gender: z.union([ z.lazy(() => EnumGenderFilterSchema),z.lazy(() => GenderSchema) ]).optional(),
  relationship: z.union([ z.lazy(() => EnumRelationshipStatusFilterSchema),z.lazy(() => RelationshipStatusSchema) ]).optional(),
  hasKids: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isReported: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isBlocked: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  profileImageId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  datingPreference: z.union([ z.lazy(() => DatingPreferenceNullableScalarRelationFilterSchema),z.lazy(() => DatingPreferenceWhereInputSchema) ]).optional().nullable(),
  tags: z.lazy(() => DatingProfileTagListRelationFilterSchema).optional(),
  profileImage: z.union([ z.lazy(() => ProfileImageNullableScalarRelationFilterSchema),z.lazy(() => ProfileImageWhereInputSchema) ]).optional().nullable(),
  otherImages: z.lazy(() => ProfileImageListRelationFilterSchema).optional()
}).strict();

export const DatingProfileOrderByWithRelationInputSchema: z.ZodType<Prisma.DatingProfileOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  publicName: z.lazy(() => SortOrderSchema).optional(),
  intro: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  birthday: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  relationship: z.lazy(() => SortOrderSchema).optional(),
  hasKids: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  isReported: z.lazy(() => SortOrderSchema).optional(),
  isBlocked: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  profileImageId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  datingPreference: z.lazy(() => DatingPreferenceOrderByWithRelationInputSchema).optional(),
  tags: z.lazy(() => DatingProfileTagOrderByRelationAggregateInputSchema).optional(),
  profileImage: z.lazy(() => ProfileImageOrderByWithRelationInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageOrderByRelationAggregateInputSchema).optional()
}).strict();

export const DatingProfileWhereUniqueInputSchema: z.ZodType<Prisma.DatingProfileWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    userId: z.string(),
    profileImageId: z.string()
  }),
  z.object({
    id: z.string().cuid(),
    userId: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
    profileImageId: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    userId: z.string(),
    profileImageId: z.string(),
  }),
  z.object({
    userId: z.string(),
  }),
  z.object({
    profileImageId: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  userId: z.string().optional(),
  profileImageId: z.string().optional(),
  AND: z.union([ z.lazy(() => DatingProfileWhereInputSchema),z.lazy(() => DatingProfileWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DatingProfileWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DatingProfileWhereInputSchema),z.lazy(() => DatingProfileWhereInputSchema).array() ]).optional(),
  publicName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  intro: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  country: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  birthday: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  gender: z.union([ z.lazy(() => EnumGenderFilterSchema),z.lazy(() => GenderSchema) ]).optional(),
  relationship: z.union([ z.lazy(() => EnumRelationshipStatusFilterSchema),z.lazy(() => RelationshipStatusSchema) ]).optional(),
  hasKids: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isReported: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isBlocked: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  datingPreference: z.union([ z.lazy(() => DatingPreferenceNullableScalarRelationFilterSchema),z.lazy(() => DatingPreferenceWhereInputSchema) ]).optional().nullable(),
  tags: z.lazy(() => DatingProfileTagListRelationFilterSchema).optional(),
  profileImage: z.union([ z.lazy(() => ProfileImageNullableScalarRelationFilterSchema),z.lazy(() => ProfileImageWhereInputSchema) ]).optional().nullable(),
  otherImages: z.lazy(() => ProfileImageListRelationFilterSchema).optional()
}).strict());

export const DatingProfileOrderByWithAggregationInputSchema: z.ZodType<Prisma.DatingProfileOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  publicName: z.lazy(() => SortOrderSchema).optional(),
  intro: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  birthday: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  relationship: z.lazy(() => SortOrderSchema).optional(),
  hasKids: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  isReported: z.lazy(() => SortOrderSchema).optional(),
  isBlocked: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  profileImageId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => DatingProfileCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DatingProfileMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DatingProfileMinOrderByAggregateInputSchema).optional()
}).strict();

export const DatingProfileScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DatingProfileScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => DatingProfileScalarWhereWithAggregatesInputSchema),z.lazy(() => DatingProfileScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DatingProfileScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DatingProfileScalarWhereWithAggregatesInputSchema),z.lazy(() => DatingProfileScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  publicName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  intro: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  country: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  birthday: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  gender: z.union([ z.lazy(() => EnumGenderWithAggregatesFilterSchema),z.lazy(() => GenderSchema) ]).optional(),
  relationship: z.union([ z.lazy(() => EnumRelationshipStatusWithAggregatesFilterSchema),z.lazy(() => RelationshipStatusSchema) ]).optional(),
  hasKids: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  isActive: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  isReported: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  isBlocked: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  profileImageId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ProfileImageWhereInputSchema: z.ZodType<Prisma.ProfileImageWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProfileImageWhereInputSchema),z.lazy(() => ProfileImageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfileImageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfileImageWhereInputSchema),z.lazy(() => ProfileImageWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  mimeType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  altText: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  storagePath: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  primaryForProfile: z.union([ z.lazy(() => ProfileNullableScalarRelationFilterSchema),z.lazy(() => ProfileWhereInputSchema) ]).optional().nullable(),
  otherForProfiles: z.lazy(() => ProfileListRelationFilterSchema).optional(),
  primaryForDatingProfile: z.union([ z.lazy(() => DatingProfileNullableScalarRelationFilterSchema),z.lazy(() => DatingProfileWhereInputSchema) ]).optional().nullable(),
  otherForDatingProfiles: z.lazy(() => DatingProfileListRelationFilterSchema).optional()
}).strict();

export const ProfileImageOrderByWithRelationInputSchema: z.ZodType<Prisma.ProfileImageOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  mimeType: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  altText: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  storagePath: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  primaryForProfile: z.lazy(() => ProfileOrderByWithRelationInputSchema).optional(),
  otherForProfiles: z.lazy(() => ProfileOrderByRelationAggregateInputSchema).optional(),
  primaryForDatingProfile: z.lazy(() => DatingProfileOrderByWithRelationInputSchema).optional(),
  otherForDatingProfiles: z.lazy(() => DatingProfileOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ProfileImageWhereUniqueInputSchema: z.ZodType<Prisma.ProfileImageWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => ProfileImageWhereInputSchema),z.lazy(() => ProfileImageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfileImageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfileImageWhereInputSchema),z.lazy(() => ProfileImageWhereInputSchema).array() ]).optional(),
  mimeType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  altText: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  storagePath: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  primaryForProfile: z.union([ z.lazy(() => ProfileNullableScalarRelationFilterSchema),z.lazy(() => ProfileWhereInputSchema) ]).optional().nullable(),
  otherForProfiles: z.lazy(() => ProfileListRelationFilterSchema).optional(),
  primaryForDatingProfile: z.union([ z.lazy(() => DatingProfileNullableScalarRelationFilterSchema),z.lazy(() => DatingProfileWhereInputSchema) ]).optional().nullable(),
  otherForDatingProfiles: z.lazy(() => DatingProfileListRelationFilterSchema).optional()
}).strict());

export const ProfileImageOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProfileImageOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  mimeType: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  altText: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  storagePath: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProfileImageCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProfileImageMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProfileImageMinOrderByAggregateInputSchema).optional()
}).strict();

export const ProfileImageScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProfileImageScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProfileImageScalarWhereWithAggregatesInputSchema),z.lazy(() => ProfileImageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfileImageScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfileImageScalarWhereWithAggregatesInputSchema),z.lazy(() => ProfileImageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  mimeType: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  altText: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  storagePath: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TagCreateInputSchema: z.ZodType<Prisma.TagCreateInput> = z.object({
  name: z.string(),
  scope: z.lazy(() => ConnectionTypeSchema),
  createdAt: z.coerce.date().optional(),
  profileTags: z.lazy(() => ProfileTagCreateNestedManyWithoutTagInputSchema).optional(),
  datingProfileTag: z.lazy(() => DatingProfileTagCreateNestedManyWithoutTagInputSchema).optional()
}).strict();

export const TagUncheckedCreateInputSchema: z.ZodType<Prisma.TagUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  scope: z.lazy(() => ConnectionTypeSchema),
  createdAt: z.coerce.date().optional(),
  profileTags: z.lazy(() => ProfileTagUncheckedCreateNestedManyWithoutTagInputSchema).optional(),
  datingProfileTag: z.lazy(() => DatingProfileTagUncheckedCreateNestedManyWithoutTagInputSchema).optional()
}).strict();

export const TagUpdateInputSchema: z.ZodType<Prisma.TagUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => ConnectionTypeSchema),z.lazy(() => EnumConnectionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  profileTags: z.lazy(() => ProfileTagUpdateManyWithoutTagNestedInputSchema).optional(),
  datingProfileTag: z.lazy(() => DatingProfileTagUpdateManyWithoutTagNestedInputSchema).optional()
}).strict();

export const TagUncheckedUpdateInputSchema: z.ZodType<Prisma.TagUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => ConnectionTypeSchema),z.lazy(() => EnumConnectionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  profileTags: z.lazy(() => ProfileTagUncheckedUpdateManyWithoutTagNestedInputSchema).optional(),
  datingProfileTag: z.lazy(() => DatingProfileTagUncheckedUpdateManyWithoutTagNestedInputSchema).optional()
}).strict();

export const TagCreateManyInputSchema: z.ZodType<Prisma.TagCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  scope: z.lazy(() => ConnectionTypeSchema),
  createdAt: z.coerce.date().optional()
}).strict();

export const TagUpdateManyMutationInputSchema: z.ZodType<Prisma.TagUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => ConnectionTypeSchema),z.lazy(() => EnumConnectionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => ConnectionTypeSchema),z.lazy(() => EnumConnectionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfileTagCreateInputSchema: z.ZodType<Prisma.ProfileTagCreateInput> = z.object({
  id: z.string().cuid().optional(),
  tag: z.lazy(() => TagCreateNestedOneWithoutProfileTagsInputSchema),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutTagsInputSchema)
}).strict();

export const ProfileTagUncheckedCreateInputSchema: z.ZodType<Prisma.ProfileTagUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  tagId: z.number().int(),
  profileId: z.string()
}).strict();

export const ProfileTagUpdateInputSchema: z.ZodType<Prisma.ProfileTagUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tag: z.lazy(() => TagUpdateOneRequiredWithoutProfileTagsNestedInputSchema).optional(),
  profile: z.lazy(() => ProfileUpdateOneRequiredWithoutTagsNestedInputSchema).optional()
}).strict();

export const ProfileTagUncheckedUpdateInputSchema: z.ZodType<Prisma.ProfileTagUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfileTagCreateManyInputSchema: z.ZodType<Prisma.ProfileTagCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  tagId: z.number().int(),
  profileId: z.string()
}).strict();

export const ProfileTagUpdateManyMutationInputSchema: z.ZodType<Prisma.ProfileTagUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfileTagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProfileTagUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DatingProfileTagCreateInputSchema: z.ZodType<Prisma.DatingProfileTagCreateInput> = z.object({
  id: z.string().cuid().optional(),
  tag: z.lazy(() => TagCreateNestedOneWithoutDatingProfileTagInputSchema),
  datingProfile: z.lazy(() => DatingProfileCreateNestedOneWithoutTagsInputSchema)
}).strict();

export const DatingProfileTagUncheckedCreateInputSchema: z.ZodType<Prisma.DatingProfileTagUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  tagId: z.number().int(),
  datingProfileId: z.string()
}).strict();

export const DatingProfileTagUpdateInputSchema: z.ZodType<Prisma.DatingProfileTagUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tag: z.lazy(() => TagUpdateOneRequiredWithoutDatingProfileTagNestedInputSchema).optional(),
  datingProfile: z.lazy(() => DatingProfileUpdateOneRequiredWithoutTagsNestedInputSchema).optional()
}).strict();

export const DatingProfileTagUncheckedUpdateInputSchema: z.ZodType<Prisma.DatingProfileTagUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  datingProfileId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DatingProfileTagCreateManyInputSchema: z.ZodType<Prisma.DatingProfileTagCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  tagId: z.number().int(),
  datingProfileId: z.string()
}).strict();

export const DatingProfileTagUpdateManyMutationInputSchema: z.ZodType<Prisma.DatingProfileTagUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DatingProfileTagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DatingProfileTagUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  datingProfileId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DatingPreferenceCreateInputSchema: z.ZodType<Prisma.DatingPreferenceCreateInput> = z.object({
  prefGender: z.lazy(() => PreferenceGenderSchema).optional(),
  prefAgeMin: z.number().int().optional().nullable(),
  prefAgeMax: z.number().int().optional().nullable(),
  profile: z.lazy(() => DatingProfileCreateNestedOneWithoutDatingPreferenceInputSchema)
}).strict();

export const DatingPreferenceUncheckedCreateInputSchema: z.ZodType<Prisma.DatingPreferenceUncheckedCreateInput> = z.object({
  userId: z.string(),
  prefGender: z.lazy(() => PreferenceGenderSchema).optional(),
  prefAgeMin: z.number().int().optional().nullable(),
  prefAgeMax: z.number().int().optional().nullable()
}).strict();

export const DatingPreferenceUpdateInputSchema: z.ZodType<Prisma.DatingPreferenceUpdateInput> = z.object({
  prefGender: z.union([ z.lazy(() => PreferenceGenderSchema),z.lazy(() => EnumPreferenceGenderFieldUpdateOperationsInputSchema) ]).optional(),
  prefAgeMin: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  prefAgeMax: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profile: z.lazy(() => DatingProfileUpdateOneRequiredWithoutDatingPreferenceNestedInputSchema).optional()
}).strict();

export const DatingPreferenceUncheckedUpdateInputSchema: z.ZodType<Prisma.DatingPreferenceUncheckedUpdateInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prefGender: z.union([ z.lazy(() => PreferenceGenderSchema),z.lazy(() => EnumPreferenceGenderFieldUpdateOperationsInputSchema) ]).optional(),
  prefAgeMin: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  prefAgeMax: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const DatingPreferenceCreateManyInputSchema: z.ZodType<Prisma.DatingPreferenceCreateManyInput> = z.object({
  userId: z.string(),
  prefGender: z.lazy(() => PreferenceGenderSchema).optional(),
  prefAgeMin: z.number().int().optional().nullable(),
  prefAgeMax: z.number().int().optional().nullable()
}).strict();

export const DatingPreferenceUpdateManyMutationInputSchema: z.ZodType<Prisma.DatingPreferenceUpdateManyMutationInput> = z.object({
  prefGender: z.union([ z.lazy(() => PreferenceGenderSchema),z.lazy(() => EnumPreferenceGenderFieldUpdateOperationsInputSchema) ]).optional(),
  prefAgeMin: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  prefAgeMax: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const DatingPreferenceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DatingPreferenceUncheckedUpdateManyInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prefGender: z.union([ z.lazy(() => PreferenceGenderSchema),z.lazy(() => EnumPreferenceGenderFieldUpdateOperationsInputSchema) ]).optional(),
  prefAgeMin: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  prefAgeMax: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ConnectionRequestCreateInputSchema: z.ZodType<Prisma.ConnectionRequestCreateInput> = z.object({
  id: z.string().cuid().optional(),
  scope: z.lazy(() => ConnectionTypeSchema),
  status: z.lazy(() => ConnectionStatusSchema),
  createdAt: z.coerce.date().optional(),
  fromUser: z.lazy(() => UserCreateNestedOneWithoutRequestsSentInputSchema),
  toUser: z.lazy(() => UserCreateNestedOneWithoutRequestsReceivedInputSchema)
}).strict();

export const ConnectionRequestUncheckedCreateInputSchema: z.ZodType<Prisma.ConnectionRequestUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  fromUserId: z.string(),
  toUserId: z.string(),
  scope: z.lazy(() => ConnectionTypeSchema),
  status: z.lazy(() => ConnectionStatusSchema),
  createdAt: z.coerce.date().optional()
}).strict();

export const ConnectionRequestUpdateInputSchema: z.ZodType<Prisma.ConnectionRequestUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => ConnectionTypeSchema),z.lazy(() => EnumConnectionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ConnectionStatusSchema),z.lazy(() => EnumConnectionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fromUser: z.lazy(() => UserUpdateOneRequiredWithoutRequestsSentNestedInputSchema).optional(),
  toUser: z.lazy(() => UserUpdateOneRequiredWithoutRequestsReceivedNestedInputSchema).optional()
}).strict();

export const ConnectionRequestUncheckedUpdateInputSchema: z.ZodType<Prisma.ConnectionRequestUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fromUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  toUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => ConnectionTypeSchema),z.lazy(() => EnumConnectionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ConnectionStatusSchema),z.lazy(() => EnumConnectionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ConnectionRequestCreateManyInputSchema: z.ZodType<Prisma.ConnectionRequestCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  fromUserId: z.string(),
  toUserId: z.string(),
  scope: z.lazy(() => ConnectionTypeSchema),
  status: z.lazy(() => ConnectionStatusSchema),
  createdAt: z.coerce.date().optional()
}).strict();

export const ConnectionRequestUpdateManyMutationInputSchema: z.ZodType<Prisma.ConnectionRequestUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => ConnectionTypeSchema),z.lazy(() => EnumConnectionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ConnectionStatusSchema),z.lazy(() => EnumConnectionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ConnectionRequestUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ConnectionRequestUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fromUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  toUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => ConnectionTypeSchema),z.lazy(() => EnumConnectionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ConnectionStatusSchema),z.lazy(() => EnumConnectionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  tokenVersion: z.number().int().optional(),
  loginToken: z.string().optional().nullable(),
  loginTokenExp: z.coerce.date().optional().nullable(),
  isActive: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  isRegistrationConfirmed: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lastLoginAt: z.coerce.date().optional().nullable(),
  language: z.string().optional().nullable(),
  lookingFor: z.union([ z.lazy(() => UserCreatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutUserInputSchema).optional(),
  datingProfile: z.lazy(() => DatingProfileCreateNestedOneWithoutUserInputSchema).optional(),
  ProfileImage: z.lazy(() => ProfileImageCreateNestedManyWithoutUserInputSchema).optional(),
  requestsSent: z.lazy(() => ConnectionRequestCreateNestedManyWithoutFromUserInputSchema).optional(),
  requestsReceived: z.lazy(() => ConnectionRequestCreateNestedManyWithoutToUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  tokenVersion: z.number().int().optional(),
  loginToken: z.string().optional().nullable(),
  loginTokenExp: z.coerce.date().optional().nullable(),
  isActive: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  isRegistrationConfirmed: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lastLoginAt: z.coerce.date().optional().nullable(),
  language: z.string().optional().nullable(),
  lookingFor: z.union([ z.lazy(() => UserCreatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  profile: z.lazy(() => ProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  datingProfile: z.lazy(() => DatingProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  ProfileImage: z.lazy(() => ProfileImageUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  requestsSent: z.lazy(() => ConnectionRequestUncheckedCreateNestedManyWithoutFromUserInputSchema).optional(),
  requestsReceived: z.lazy(() => ConnectionRequestUncheckedCreateNestedManyWithoutToUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tokenVersion: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  loginToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  loginTokenExp: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isRegistrationConfirmed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastLoginAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  language: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lookingFor: z.union([ z.lazy(() => UserUpdatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profile: z.lazy(() => ProfileUpdateOneWithoutUserNestedInputSchema).optional(),
  datingProfile: z.lazy(() => DatingProfileUpdateOneWithoutUserNestedInputSchema).optional(),
  ProfileImage: z.lazy(() => ProfileImageUpdateManyWithoutUserNestedInputSchema).optional(),
  requestsSent: z.lazy(() => ConnectionRequestUpdateManyWithoutFromUserNestedInputSchema).optional(),
  requestsReceived: z.lazy(() => ConnectionRequestUpdateManyWithoutToUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tokenVersion: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  loginToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  loginTokenExp: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isRegistrationConfirmed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastLoginAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  language: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lookingFor: z.union([ z.lazy(() => UserUpdatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profile: z.lazy(() => ProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  datingProfile: z.lazy(() => DatingProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  ProfileImage: z.lazy(() => ProfileImageUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  requestsSent: z.lazy(() => ConnectionRequestUncheckedUpdateManyWithoutFromUserNestedInputSchema).optional(),
  requestsReceived: z.lazy(() => ConnectionRequestUncheckedUpdateManyWithoutToUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  tokenVersion: z.number().int().optional(),
  loginToken: z.string().optional().nullable(),
  loginTokenExp: z.coerce.date().optional().nullable(),
  isActive: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  isRegistrationConfirmed: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lastLoginAt: z.coerce.date().optional().nullable(),
  language: z.string().optional().nullable(),
  lookingFor: z.union([ z.lazy(() => UserCreatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tokenVersion: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  loginToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  loginTokenExp: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isRegistrationConfirmed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastLoginAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  language: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lookingFor: z.union([ z.lazy(() => UserUpdatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tokenVersion: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  loginToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  loginTokenExp: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isRegistrationConfirmed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastLoginAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  language: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lookingFor: z.union([ z.lazy(() => UserUpdatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ProfileCreateInputSchema: z.ZodType<Prisma.ProfileCreateInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  intro: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutProfileInputSchema),
  tags: z.lazy(() => ProfileTagCreateNestedManyWithoutProfileInputSchema).optional(),
  profileImage: z.lazy(() => ProfileImageCreateNestedOneWithoutPrimaryForProfileInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageCreateNestedManyWithoutOtherForProfilesInputSchema).optional()
}).strict();

export const ProfileUncheckedCreateInputSchema: z.ZodType<Prisma.ProfileUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  intro: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  userId: z.string(),
  profileImageId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tags: z.lazy(() => ProfileTagUncheckedCreateNestedManyWithoutProfileInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageUncheckedCreateNestedManyWithoutOtherForProfilesInputSchema).optional()
}).strict();

export const ProfileUpdateInputSchema: z.ZodType<Prisma.ProfileUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  intro: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutProfileNestedInputSchema).optional(),
  tags: z.lazy(() => ProfileTagUpdateManyWithoutProfileNestedInputSchema).optional(),
  profileImage: z.lazy(() => ProfileImageUpdateOneWithoutPrimaryForProfileNestedInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageUpdateManyWithoutOtherForProfilesNestedInputSchema).optional()
}).strict();

export const ProfileUncheckedUpdateInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  intro: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => ProfileTagUncheckedUpdateManyWithoutProfileNestedInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageUncheckedUpdateManyWithoutOtherForProfilesNestedInputSchema).optional()
}).strict();

export const ProfileCreateManyInputSchema: z.ZodType<Prisma.ProfileCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  intro: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  userId: z.string(),
  profileImageId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ProfileUpdateManyMutationInputSchema: z.ZodType<Prisma.ProfileUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  intro: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfileUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  intro: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DatingProfileCreateInputSchema: z.ZodType<Prisma.DatingProfileCreateInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  intro: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  birthday: z.coerce.date().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional(),
  relationship: z.lazy(() => RelationshipStatusSchema).optional(),
  hasKids: z.boolean().optional().nullable(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutDatingProfileInputSchema),
  datingPreference: z.lazy(() => DatingPreferenceCreateNestedOneWithoutProfileInputSchema).optional(),
  tags: z.lazy(() => DatingProfileTagCreateNestedManyWithoutDatingProfileInputSchema).optional(),
  profileImage: z.lazy(() => ProfileImageCreateNestedOneWithoutPrimaryForDatingProfileInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageCreateNestedManyWithoutOtherForDatingProfilesInputSchema).optional()
}).strict();

export const DatingProfileUncheckedCreateInputSchema: z.ZodType<Prisma.DatingProfileUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  intro: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  birthday: z.coerce.date().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional(),
  relationship: z.lazy(() => RelationshipStatusSchema).optional(),
  hasKids: z.boolean().optional().nullable(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  profileImageId: z.string().optional().nullable(),
  datingPreference: z.lazy(() => DatingPreferenceUncheckedCreateNestedOneWithoutProfileInputSchema).optional(),
  tags: z.lazy(() => DatingProfileTagUncheckedCreateNestedManyWithoutDatingProfileInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageUncheckedCreateNestedManyWithoutOtherForDatingProfilesInputSchema).optional()
}).strict();

export const DatingProfileUpdateInputSchema: z.ZodType<Prisma.DatingProfileUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  intro: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  relationship: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => EnumRelationshipStatusFieldUpdateOperationsInputSchema) ]).optional(),
  hasKids: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutDatingProfileNestedInputSchema).optional(),
  datingPreference: z.lazy(() => DatingPreferenceUpdateOneWithoutProfileNestedInputSchema).optional(),
  tags: z.lazy(() => DatingProfileTagUpdateManyWithoutDatingProfileNestedInputSchema).optional(),
  profileImage: z.lazy(() => ProfileImageUpdateOneWithoutPrimaryForDatingProfileNestedInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageUpdateManyWithoutOtherForDatingProfilesNestedInputSchema).optional()
}).strict();

export const DatingProfileUncheckedUpdateInputSchema: z.ZodType<Prisma.DatingProfileUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  intro: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  relationship: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => EnumRelationshipStatusFieldUpdateOperationsInputSchema) ]).optional(),
  hasKids: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  datingPreference: z.lazy(() => DatingPreferenceUncheckedUpdateOneWithoutProfileNestedInputSchema).optional(),
  tags: z.lazy(() => DatingProfileTagUncheckedUpdateManyWithoutDatingProfileNestedInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageUncheckedUpdateManyWithoutOtherForDatingProfilesNestedInputSchema).optional()
}).strict();

export const DatingProfileCreateManyInputSchema: z.ZodType<Prisma.DatingProfileCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  intro: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  birthday: z.coerce.date().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional(),
  relationship: z.lazy(() => RelationshipStatusSchema).optional(),
  hasKids: z.boolean().optional().nullable(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  profileImageId: z.string().optional().nullable()
}).strict();

export const DatingProfileUpdateManyMutationInputSchema: z.ZodType<Prisma.DatingProfileUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  intro: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  relationship: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => EnumRelationshipStatusFieldUpdateOperationsInputSchema) ]).optional(),
  hasKids: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DatingProfileUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DatingProfileUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  intro: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  relationship: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => EnumRelationshipStatusFieldUpdateOperationsInputSchema) ]).optional(),
  hasKids: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ProfileImageCreateInputSchema: z.ZodType<Prisma.ProfileImageCreateInput> = z.object({
  id: z.string().cuid().optional(),
  mimeType: z.string(),
  altText: z.string().optional().nullable(),
  storagePath: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutProfileImageInputSchema),
  primaryForProfile: z.lazy(() => ProfileCreateNestedOneWithoutProfileImageInputSchema).optional(),
  otherForProfiles: z.lazy(() => ProfileCreateNestedManyWithoutOtherImagesInputSchema).optional(),
  primaryForDatingProfile: z.lazy(() => DatingProfileCreateNestedOneWithoutProfileImageInputSchema).optional(),
  otherForDatingProfiles: z.lazy(() => DatingProfileCreateNestedManyWithoutOtherImagesInputSchema).optional()
}).strict();

export const ProfileImageUncheckedCreateInputSchema: z.ZodType<Prisma.ProfileImageUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  mimeType: z.string(),
  userId: z.string(),
  altText: z.string().optional().nullable(),
  storagePath: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  primaryForProfile: z.lazy(() => ProfileUncheckedCreateNestedOneWithoutProfileImageInputSchema).optional(),
  otherForProfiles: z.lazy(() => ProfileUncheckedCreateNestedManyWithoutOtherImagesInputSchema).optional(),
  primaryForDatingProfile: z.lazy(() => DatingProfileUncheckedCreateNestedOneWithoutProfileImageInputSchema).optional(),
  otherForDatingProfiles: z.lazy(() => DatingProfileUncheckedCreateNestedManyWithoutOtherImagesInputSchema).optional()
}).strict();

export const ProfileImageUpdateInputSchema: z.ZodType<Prisma.ProfileImageUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  altText: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  storagePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutProfileImageNestedInputSchema).optional(),
  primaryForProfile: z.lazy(() => ProfileUpdateOneWithoutProfileImageNestedInputSchema).optional(),
  otherForProfiles: z.lazy(() => ProfileUpdateManyWithoutOtherImagesNestedInputSchema).optional(),
  primaryForDatingProfile: z.lazy(() => DatingProfileUpdateOneWithoutProfileImageNestedInputSchema).optional(),
  otherForDatingProfiles: z.lazy(() => DatingProfileUpdateManyWithoutOtherImagesNestedInputSchema).optional()
}).strict();

export const ProfileImageUncheckedUpdateInputSchema: z.ZodType<Prisma.ProfileImageUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  altText: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  storagePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  primaryForProfile: z.lazy(() => ProfileUncheckedUpdateOneWithoutProfileImageNestedInputSchema).optional(),
  otherForProfiles: z.lazy(() => ProfileUncheckedUpdateManyWithoutOtherImagesNestedInputSchema).optional(),
  primaryForDatingProfile: z.lazy(() => DatingProfileUncheckedUpdateOneWithoutProfileImageNestedInputSchema).optional(),
  otherForDatingProfiles: z.lazy(() => DatingProfileUncheckedUpdateManyWithoutOtherImagesNestedInputSchema).optional()
}).strict();

export const ProfileImageCreateManyInputSchema: z.ZodType<Prisma.ProfileImageCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  mimeType: z.string(),
  userId: z.string(),
  altText: z.string().optional().nullable(),
  storagePath: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ProfileImageUpdateManyMutationInputSchema: z.ZodType<Prisma.ProfileImageUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  altText: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  storagePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfileImageUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProfileImageUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  altText: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  storagePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
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

export const EnumConnectionTypeFilterSchema: z.ZodType<Prisma.EnumConnectionTypeFilter> = z.object({
  equals: z.lazy(() => ConnectionTypeSchema).optional(),
  in: z.lazy(() => ConnectionTypeSchema).array().optional(),
  notIn: z.lazy(() => ConnectionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ConnectionTypeSchema),z.lazy(() => NestedEnumConnectionTypeFilterSchema) ]).optional(),
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

export const ProfileTagListRelationFilterSchema: z.ZodType<Prisma.ProfileTagListRelationFilter> = z.object({
  every: z.lazy(() => ProfileTagWhereInputSchema).optional(),
  some: z.lazy(() => ProfileTagWhereInputSchema).optional(),
  none: z.lazy(() => ProfileTagWhereInputSchema).optional()
}).strict();

export const DatingProfileTagListRelationFilterSchema: z.ZodType<Prisma.DatingProfileTagListRelationFilter> = z.object({
  every: z.lazy(() => DatingProfileTagWhereInputSchema).optional(),
  some: z.lazy(() => DatingProfileTagWhereInputSchema).optional(),
  none: z.lazy(() => DatingProfileTagWhereInputSchema).optional()
}).strict();

export const ProfileTagOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ProfileTagOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DatingProfileTagOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DatingProfileTagOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagCountOrderByAggregateInputSchema: z.ZodType<Prisma.TagCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TagAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TagMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagMinOrderByAggregateInputSchema: z.ZodType<Prisma.TagMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagSumOrderByAggregateInputSchema: z.ZodType<Prisma.TagSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
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

export const EnumConnectionTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumConnectionTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ConnectionTypeSchema).optional(),
  in: z.lazy(() => ConnectionTypeSchema).array().optional(),
  notIn: z.lazy(() => ConnectionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ConnectionTypeSchema),z.lazy(() => NestedEnumConnectionTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumConnectionTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumConnectionTypeFilterSchema).optional()
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

export const TagScalarRelationFilterSchema: z.ZodType<Prisma.TagScalarRelationFilter> = z.object({
  is: z.lazy(() => TagWhereInputSchema).optional(),
  isNot: z.lazy(() => TagWhereInputSchema).optional()
}).strict();

export const ProfileScalarRelationFilterSchema: z.ZodType<Prisma.ProfileScalarRelationFilter> = z.object({
  is: z.lazy(() => ProfileWhereInputSchema).optional(),
  isNot: z.lazy(() => ProfileWhereInputSchema).optional()
}).strict();

export const ProfileTagProfileIdTagIdCompoundUniqueInputSchema: z.ZodType<Prisma.ProfileTagProfileIdTagIdCompoundUniqueInput> = z.object({
  profileId: z.string(),
  tagId: z.number()
}).strict();

export const ProfileTagCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileTagCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileTagAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileTagAvgOrderByAggregateInput> = z.object({
  tagId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileTagMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileTagMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileTagMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileTagMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileTagSumOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileTagSumOrderByAggregateInput> = z.object({
  tagId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DatingProfileScalarRelationFilterSchema: z.ZodType<Prisma.DatingProfileScalarRelationFilter> = z.object({
  is: z.lazy(() => DatingProfileWhereInputSchema).optional(),
  isNot: z.lazy(() => DatingProfileWhereInputSchema).optional()
}).strict();

export const DatingProfileTagDatingProfileIdTagIdCompoundUniqueInputSchema: z.ZodType<Prisma.DatingProfileTagDatingProfileIdTagIdCompoundUniqueInput> = z.object({
  datingProfileId: z.string(),
  tagId: z.number()
}).strict();

export const DatingProfileTagCountOrderByAggregateInputSchema: z.ZodType<Prisma.DatingProfileTagCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional(),
  datingProfileId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DatingProfileTagAvgOrderByAggregateInputSchema: z.ZodType<Prisma.DatingProfileTagAvgOrderByAggregateInput> = z.object({
  tagId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DatingProfileTagMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DatingProfileTagMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional(),
  datingProfileId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DatingProfileTagMinOrderByAggregateInputSchema: z.ZodType<Prisma.DatingProfileTagMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional(),
  datingProfileId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DatingProfileTagSumOrderByAggregateInputSchema: z.ZodType<Prisma.DatingProfileTagSumOrderByAggregateInput> = z.object({
  tagId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumPreferenceGenderFilterSchema: z.ZodType<Prisma.EnumPreferenceGenderFilter> = z.object({
  equals: z.lazy(() => PreferenceGenderSchema).optional(),
  in: z.lazy(() => PreferenceGenderSchema).array().optional(),
  notIn: z.lazy(() => PreferenceGenderSchema).array().optional(),
  not: z.union([ z.lazy(() => PreferenceGenderSchema),z.lazy(() => NestedEnumPreferenceGenderFilterSchema) ]).optional(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const DatingPreferenceCountOrderByAggregateInputSchema: z.ZodType<Prisma.DatingPreferenceCountOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  prefGender: z.lazy(() => SortOrderSchema).optional(),
  prefAgeMin: z.lazy(() => SortOrderSchema).optional(),
  prefAgeMax: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DatingPreferenceAvgOrderByAggregateInputSchema: z.ZodType<Prisma.DatingPreferenceAvgOrderByAggregateInput> = z.object({
  prefAgeMin: z.lazy(() => SortOrderSchema).optional(),
  prefAgeMax: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DatingPreferenceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DatingPreferenceMaxOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  prefGender: z.lazy(() => SortOrderSchema).optional(),
  prefAgeMin: z.lazy(() => SortOrderSchema).optional(),
  prefAgeMax: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DatingPreferenceMinOrderByAggregateInputSchema: z.ZodType<Prisma.DatingPreferenceMinOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  prefGender: z.lazy(() => SortOrderSchema).optional(),
  prefAgeMin: z.lazy(() => SortOrderSchema).optional(),
  prefAgeMax: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DatingPreferenceSumOrderByAggregateInputSchema: z.ZodType<Prisma.DatingPreferenceSumOrderByAggregateInput> = z.object({
  prefAgeMin: z.lazy(() => SortOrderSchema).optional(),
  prefAgeMax: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumPreferenceGenderWithAggregatesFilterSchema: z.ZodType<Prisma.EnumPreferenceGenderWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PreferenceGenderSchema).optional(),
  in: z.lazy(() => PreferenceGenderSchema).array().optional(),
  notIn: z.lazy(() => PreferenceGenderSchema).array().optional(),
  not: z.union([ z.lazy(() => PreferenceGenderSchema),z.lazy(() => NestedEnumPreferenceGenderWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPreferenceGenderFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPreferenceGenderFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const EnumConnectionStatusFilterSchema: z.ZodType<Prisma.EnumConnectionStatusFilter> = z.object({
  equals: z.lazy(() => ConnectionStatusSchema).optional(),
  in: z.lazy(() => ConnectionStatusSchema).array().optional(),
  notIn: z.lazy(() => ConnectionStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ConnectionStatusSchema),z.lazy(() => NestedEnumConnectionStatusFilterSchema) ]).optional(),
}).strict();

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const ConnectionRequestFromUserIdToUserIdScopeCompoundUniqueInputSchema: z.ZodType<Prisma.ConnectionRequestFromUserIdToUserIdScopeCompoundUniqueInput> = z.object({
  fromUserId: z.string(),
  toUserId: z.string(),
  scope: z.lazy(() => ConnectionTypeSchema)
}).strict();

export const ConnectionRequestCountOrderByAggregateInputSchema: z.ZodType<Prisma.ConnectionRequestCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fromUserId: z.lazy(() => SortOrderSchema).optional(),
  toUserId: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ConnectionRequestMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ConnectionRequestMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fromUserId: z.lazy(() => SortOrderSchema).optional(),
  toUserId: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ConnectionRequestMinOrderByAggregateInputSchema: z.ZodType<Prisma.ConnectionRequestMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  fromUserId: z.lazy(() => SortOrderSchema).optional(),
  toUserId: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumConnectionStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumConnectionStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ConnectionStatusSchema).optional(),
  in: z.lazy(() => ConnectionStatusSchema).array().optional(),
  notIn: z.lazy(() => ConnectionStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ConnectionStatusSchema),z.lazy(() => NestedEnumConnectionStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumConnectionStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumConnectionStatusFilterSchema).optional()
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

export const ProfileNullableScalarRelationFilterSchema: z.ZodType<Prisma.ProfileNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => ProfileWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ProfileWhereInputSchema).optional().nullable()
}).strict();

export const DatingProfileNullableScalarRelationFilterSchema: z.ZodType<Prisma.DatingProfileNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => DatingProfileWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => DatingProfileWhereInputSchema).optional().nullable()
}).strict();

export const ProfileImageListRelationFilterSchema: z.ZodType<Prisma.ProfileImageListRelationFilter> = z.object({
  every: z.lazy(() => ProfileImageWhereInputSchema).optional(),
  some: z.lazy(() => ProfileImageWhereInputSchema).optional(),
  none: z.lazy(() => ProfileImageWhereInputSchema).optional()
}).strict();

export const ConnectionRequestListRelationFilterSchema: z.ZodType<Prisma.ConnectionRequestListRelationFilter> = z.object({
  every: z.lazy(() => ConnectionRequestWhereInputSchema).optional(),
  some: z.lazy(() => ConnectionRequestWhereInputSchema).optional(),
  none: z.lazy(() => ConnectionRequestWhereInputSchema).optional()
}).strict();

export const ProfileImageOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ProfileImageOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ConnectionRequestOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ConnectionRequestOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  tokenVersion: z.lazy(() => SortOrderSchema).optional(),
  loginToken: z.lazy(() => SortOrderSchema).optional(),
  loginTokenExp: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  isBlocked: z.lazy(() => SortOrderSchema).optional(),
  isRegistrationConfirmed: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  lastLoginAt: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  lookingFor: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> = z.object({
  tokenVersion: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  tokenVersion: z.lazy(() => SortOrderSchema).optional(),
  loginToken: z.lazy(() => SortOrderSchema).optional(),
  loginTokenExp: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  isBlocked: z.lazy(() => SortOrderSchema).optional(),
  isRegistrationConfirmed: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  lastLoginAt: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  tokenVersion: z.lazy(() => SortOrderSchema).optional(),
  loginToken: z.lazy(() => SortOrderSchema).optional(),
  loginTokenExp: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  isBlocked: z.lazy(() => SortOrderSchema).optional(),
  isRegistrationConfirmed: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  lastLoginAt: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> = z.object({
  tokenVersion: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional()
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

export const ProfileImageNullableScalarRelationFilterSchema: z.ZodType<Prisma.ProfileImageNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => ProfileImageWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ProfileImageWhereInputSchema).optional().nullable()
}).strict();

export const ProfileCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  publicName: z.lazy(() => SortOrderSchema).optional(),
  intro: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  isReported: z.lazy(() => SortOrderSchema).optional(),
  isBlocked: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  profileImageId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  publicName: z.lazy(() => SortOrderSchema).optional(),
  intro: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  isReported: z.lazy(() => SortOrderSchema).optional(),
  isBlocked: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  profileImageId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  publicName: z.lazy(() => SortOrderSchema).optional(),
  intro: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  isReported: z.lazy(() => SortOrderSchema).optional(),
  isBlocked: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  profileImageId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
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

export const DatingPreferenceNullableScalarRelationFilterSchema: z.ZodType<Prisma.DatingPreferenceNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => DatingPreferenceWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => DatingPreferenceWhereInputSchema).optional().nullable()
}).strict();

export const DatingProfileCountOrderByAggregateInputSchema: z.ZodType<Prisma.DatingProfileCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  publicName: z.lazy(() => SortOrderSchema).optional(),
  intro: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  birthday: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  relationship: z.lazy(() => SortOrderSchema).optional(),
  hasKids: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  isReported: z.lazy(() => SortOrderSchema).optional(),
  isBlocked: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  profileImageId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DatingProfileMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DatingProfileMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  publicName: z.lazy(() => SortOrderSchema).optional(),
  intro: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  birthday: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  relationship: z.lazy(() => SortOrderSchema).optional(),
  hasKids: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  isReported: z.lazy(() => SortOrderSchema).optional(),
  isBlocked: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  profileImageId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DatingProfileMinOrderByAggregateInputSchema: z.ZodType<Prisma.DatingProfileMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  publicName: z.lazy(() => SortOrderSchema).optional(),
  intro: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  birthday: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  relationship: z.lazy(() => SortOrderSchema).optional(),
  hasKids: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  isReported: z.lazy(() => SortOrderSchema).optional(),
  isBlocked: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  profileImageId: z.lazy(() => SortOrderSchema).optional()
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

export const ProfileListRelationFilterSchema: z.ZodType<Prisma.ProfileListRelationFilter> = z.object({
  every: z.lazy(() => ProfileWhereInputSchema).optional(),
  some: z.lazy(() => ProfileWhereInputSchema).optional(),
  none: z.lazy(() => ProfileWhereInputSchema).optional()
}).strict();

export const DatingProfileListRelationFilterSchema: z.ZodType<Prisma.DatingProfileListRelationFilter> = z.object({
  every: z.lazy(() => DatingProfileWhereInputSchema).optional(),
  some: z.lazy(() => DatingProfileWhereInputSchema).optional(),
  none: z.lazy(() => DatingProfileWhereInputSchema).optional()
}).strict();

export const ProfileOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ProfileOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DatingProfileOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DatingProfileOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileImageCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileImageCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  mimeType: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  altText: z.lazy(() => SortOrderSchema).optional(),
  storagePath: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileImageMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileImageMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  mimeType: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  altText: z.lazy(() => SortOrderSchema).optional(),
  storagePath: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileImageMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileImageMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  mimeType: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  altText: z.lazy(() => SortOrderSchema).optional(),
  storagePath: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileTagCreateNestedManyWithoutTagInputSchema: z.ZodType<Prisma.ProfileTagCreateNestedManyWithoutTagInput> = z.object({
  create: z.union([ z.lazy(() => ProfileTagCreateWithoutTagInputSchema),z.lazy(() => ProfileTagCreateWithoutTagInputSchema).array(),z.lazy(() => ProfileTagUncheckedCreateWithoutTagInputSchema),z.lazy(() => ProfileTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfileTagCreateOrConnectWithoutTagInputSchema),z.lazy(() => ProfileTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProfileTagCreateManyTagInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProfileTagWhereUniqueInputSchema),z.lazy(() => ProfileTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DatingProfileTagCreateNestedManyWithoutTagInputSchema: z.ZodType<Prisma.DatingProfileTagCreateNestedManyWithoutTagInput> = z.object({
  create: z.union([ z.lazy(() => DatingProfileTagCreateWithoutTagInputSchema),z.lazy(() => DatingProfileTagCreateWithoutTagInputSchema).array(),z.lazy(() => DatingProfileTagUncheckedCreateWithoutTagInputSchema),z.lazy(() => DatingProfileTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DatingProfileTagCreateOrConnectWithoutTagInputSchema),z.lazy(() => DatingProfileTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DatingProfileTagCreateManyTagInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DatingProfileTagWhereUniqueInputSchema),z.lazy(() => DatingProfileTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProfileTagUncheckedCreateNestedManyWithoutTagInputSchema: z.ZodType<Prisma.ProfileTagUncheckedCreateNestedManyWithoutTagInput> = z.object({
  create: z.union([ z.lazy(() => ProfileTagCreateWithoutTagInputSchema),z.lazy(() => ProfileTagCreateWithoutTagInputSchema).array(),z.lazy(() => ProfileTagUncheckedCreateWithoutTagInputSchema),z.lazy(() => ProfileTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfileTagCreateOrConnectWithoutTagInputSchema),z.lazy(() => ProfileTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProfileTagCreateManyTagInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProfileTagWhereUniqueInputSchema),z.lazy(() => ProfileTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DatingProfileTagUncheckedCreateNestedManyWithoutTagInputSchema: z.ZodType<Prisma.DatingProfileTagUncheckedCreateNestedManyWithoutTagInput> = z.object({
  create: z.union([ z.lazy(() => DatingProfileTagCreateWithoutTagInputSchema),z.lazy(() => DatingProfileTagCreateWithoutTagInputSchema).array(),z.lazy(() => DatingProfileTagUncheckedCreateWithoutTagInputSchema),z.lazy(() => DatingProfileTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DatingProfileTagCreateOrConnectWithoutTagInputSchema),z.lazy(() => DatingProfileTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DatingProfileTagCreateManyTagInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DatingProfileTagWhereUniqueInputSchema),z.lazy(() => DatingProfileTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const EnumConnectionTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumConnectionTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ConnectionTypeSchema).optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
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

export const DatingProfileTagUpdateManyWithoutTagNestedInputSchema: z.ZodType<Prisma.DatingProfileTagUpdateManyWithoutTagNestedInput> = z.object({
  create: z.union([ z.lazy(() => DatingProfileTagCreateWithoutTagInputSchema),z.lazy(() => DatingProfileTagCreateWithoutTagInputSchema).array(),z.lazy(() => DatingProfileTagUncheckedCreateWithoutTagInputSchema),z.lazy(() => DatingProfileTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DatingProfileTagCreateOrConnectWithoutTagInputSchema),z.lazy(() => DatingProfileTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DatingProfileTagUpsertWithWhereUniqueWithoutTagInputSchema),z.lazy(() => DatingProfileTagUpsertWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DatingProfileTagCreateManyTagInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DatingProfileTagWhereUniqueInputSchema),z.lazy(() => DatingProfileTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DatingProfileTagWhereUniqueInputSchema),z.lazy(() => DatingProfileTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DatingProfileTagWhereUniqueInputSchema),z.lazy(() => DatingProfileTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DatingProfileTagWhereUniqueInputSchema),z.lazy(() => DatingProfileTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DatingProfileTagUpdateWithWhereUniqueWithoutTagInputSchema),z.lazy(() => DatingProfileTagUpdateWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DatingProfileTagUpdateManyWithWhereWithoutTagInputSchema),z.lazy(() => DatingProfileTagUpdateManyWithWhereWithoutTagInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DatingProfileTagScalarWhereInputSchema),z.lazy(() => DatingProfileTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
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

export const DatingProfileTagUncheckedUpdateManyWithoutTagNestedInputSchema: z.ZodType<Prisma.DatingProfileTagUncheckedUpdateManyWithoutTagNestedInput> = z.object({
  create: z.union([ z.lazy(() => DatingProfileTagCreateWithoutTagInputSchema),z.lazy(() => DatingProfileTagCreateWithoutTagInputSchema).array(),z.lazy(() => DatingProfileTagUncheckedCreateWithoutTagInputSchema),z.lazy(() => DatingProfileTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DatingProfileTagCreateOrConnectWithoutTagInputSchema),z.lazy(() => DatingProfileTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DatingProfileTagUpsertWithWhereUniqueWithoutTagInputSchema),z.lazy(() => DatingProfileTagUpsertWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DatingProfileTagCreateManyTagInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DatingProfileTagWhereUniqueInputSchema),z.lazy(() => DatingProfileTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DatingProfileTagWhereUniqueInputSchema),z.lazy(() => DatingProfileTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DatingProfileTagWhereUniqueInputSchema),z.lazy(() => DatingProfileTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DatingProfileTagWhereUniqueInputSchema),z.lazy(() => DatingProfileTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DatingProfileTagUpdateWithWhereUniqueWithoutTagInputSchema),z.lazy(() => DatingProfileTagUpdateWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DatingProfileTagUpdateManyWithWhereWithoutTagInputSchema),z.lazy(() => DatingProfileTagUpdateManyWithWhereWithoutTagInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DatingProfileTagScalarWhereInputSchema),z.lazy(() => DatingProfileTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TagCreateNestedOneWithoutProfileTagsInputSchema: z.ZodType<Prisma.TagCreateNestedOneWithoutProfileTagsInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutProfileTagsInputSchema),z.lazy(() => TagUncheckedCreateWithoutProfileTagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TagCreateOrConnectWithoutProfileTagsInputSchema).optional(),
  connect: z.lazy(() => TagWhereUniqueInputSchema).optional()
}).strict();

export const ProfileCreateNestedOneWithoutTagsInputSchema: z.ZodType<Prisma.ProfileCreateNestedOneWithoutTagsInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutTagsInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutTagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutTagsInputSchema).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional()
}).strict();

export const TagUpdateOneRequiredWithoutProfileTagsNestedInputSchema: z.ZodType<Prisma.TagUpdateOneRequiredWithoutProfileTagsNestedInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutProfileTagsInputSchema),z.lazy(() => TagUncheckedCreateWithoutProfileTagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TagCreateOrConnectWithoutProfileTagsInputSchema).optional(),
  upsert: z.lazy(() => TagUpsertWithoutProfileTagsInputSchema).optional(),
  connect: z.lazy(() => TagWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TagUpdateToOneWithWhereWithoutProfileTagsInputSchema),z.lazy(() => TagUpdateWithoutProfileTagsInputSchema),z.lazy(() => TagUncheckedUpdateWithoutProfileTagsInputSchema) ]).optional(),
}).strict();

export const ProfileUpdateOneRequiredWithoutTagsNestedInputSchema: z.ZodType<Prisma.ProfileUpdateOneRequiredWithoutTagsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutTagsInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutTagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutTagsInputSchema).optional(),
  upsert: z.lazy(() => ProfileUpsertWithoutTagsInputSchema).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProfileUpdateToOneWithWhereWithoutTagsInputSchema),z.lazy(() => ProfileUpdateWithoutTagsInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutTagsInputSchema) ]).optional(),
}).strict();

export const TagCreateNestedOneWithoutDatingProfileTagInputSchema: z.ZodType<Prisma.TagCreateNestedOneWithoutDatingProfileTagInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutDatingProfileTagInputSchema),z.lazy(() => TagUncheckedCreateWithoutDatingProfileTagInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TagCreateOrConnectWithoutDatingProfileTagInputSchema).optional(),
  connect: z.lazy(() => TagWhereUniqueInputSchema).optional()
}).strict();

export const DatingProfileCreateNestedOneWithoutTagsInputSchema: z.ZodType<Prisma.DatingProfileCreateNestedOneWithoutTagsInput> = z.object({
  create: z.union([ z.lazy(() => DatingProfileCreateWithoutTagsInputSchema),z.lazy(() => DatingProfileUncheckedCreateWithoutTagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DatingProfileCreateOrConnectWithoutTagsInputSchema).optional(),
  connect: z.lazy(() => DatingProfileWhereUniqueInputSchema).optional()
}).strict();

export const TagUpdateOneRequiredWithoutDatingProfileTagNestedInputSchema: z.ZodType<Prisma.TagUpdateOneRequiredWithoutDatingProfileTagNestedInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutDatingProfileTagInputSchema),z.lazy(() => TagUncheckedCreateWithoutDatingProfileTagInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TagCreateOrConnectWithoutDatingProfileTagInputSchema).optional(),
  upsert: z.lazy(() => TagUpsertWithoutDatingProfileTagInputSchema).optional(),
  connect: z.lazy(() => TagWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TagUpdateToOneWithWhereWithoutDatingProfileTagInputSchema),z.lazy(() => TagUpdateWithoutDatingProfileTagInputSchema),z.lazy(() => TagUncheckedUpdateWithoutDatingProfileTagInputSchema) ]).optional(),
}).strict();

export const DatingProfileUpdateOneRequiredWithoutTagsNestedInputSchema: z.ZodType<Prisma.DatingProfileUpdateOneRequiredWithoutTagsNestedInput> = z.object({
  create: z.union([ z.lazy(() => DatingProfileCreateWithoutTagsInputSchema),z.lazy(() => DatingProfileUncheckedCreateWithoutTagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DatingProfileCreateOrConnectWithoutTagsInputSchema).optional(),
  upsert: z.lazy(() => DatingProfileUpsertWithoutTagsInputSchema).optional(),
  connect: z.lazy(() => DatingProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DatingProfileUpdateToOneWithWhereWithoutTagsInputSchema),z.lazy(() => DatingProfileUpdateWithoutTagsInputSchema),z.lazy(() => DatingProfileUncheckedUpdateWithoutTagsInputSchema) ]).optional(),
}).strict();

export const DatingProfileCreateNestedOneWithoutDatingPreferenceInputSchema: z.ZodType<Prisma.DatingProfileCreateNestedOneWithoutDatingPreferenceInput> = z.object({
  create: z.union([ z.lazy(() => DatingProfileCreateWithoutDatingPreferenceInputSchema),z.lazy(() => DatingProfileUncheckedCreateWithoutDatingPreferenceInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DatingProfileCreateOrConnectWithoutDatingPreferenceInputSchema).optional(),
  connect: z.lazy(() => DatingProfileWhereUniqueInputSchema).optional()
}).strict();

export const EnumPreferenceGenderFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumPreferenceGenderFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => PreferenceGenderSchema).optional()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const DatingProfileUpdateOneRequiredWithoutDatingPreferenceNestedInputSchema: z.ZodType<Prisma.DatingProfileUpdateOneRequiredWithoutDatingPreferenceNestedInput> = z.object({
  create: z.union([ z.lazy(() => DatingProfileCreateWithoutDatingPreferenceInputSchema),z.lazy(() => DatingProfileUncheckedCreateWithoutDatingPreferenceInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DatingProfileCreateOrConnectWithoutDatingPreferenceInputSchema).optional(),
  upsert: z.lazy(() => DatingProfileUpsertWithoutDatingPreferenceInputSchema).optional(),
  connect: z.lazy(() => DatingProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DatingProfileUpdateToOneWithWhereWithoutDatingPreferenceInputSchema),z.lazy(() => DatingProfileUpdateWithoutDatingPreferenceInputSchema),z.lazy(() => DatingProfileUncheckedUpdateWithoutDatingPreferenceInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutRequestsSentInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutRequestsSentInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRequestsSentInputSchema),z.lazy(() => UserUncheckedCreateWithoutRequestsSentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRequestsSentInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutRequestsReceivedInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutRequestsReceivedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRequestsReceivedInputSchema),z.lazy(() => UserUncheckedCreateWithoutRequestsReceivedInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRequestsReceivedInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const EnumConnectionStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumConnectionStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ConnectionStatusSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutRequestsSentNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutRequestsSentNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRequestsSentInputSchema),z.lazy(() => UserUncheckedCreateWithoutRequestsSentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRequestsSentInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutRequestsSentInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutRequestsSentInputSchema),z.lazy(() => UserUpdateWithoutRequestsSentInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRequestsSentInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutRequestsReceivedNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutRequestsReceivedNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRequestsReceivedInputSchema),z.lazy(() => UserUncheckedCreateWithoutRequestsReceivedInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRequestsReceivedInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutRequestsReceivedInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutRequestsReceivedInputSchema),z.lazy(() => UserUpdateWithoutRequestsReceivedInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRequestsReceivedInputSchema) ]).optional(),
}).strict();

export const UserCreatelookingForInputSchema: z.ZodType<Prisma.UserCreatelookingForInput> = z.object({
  set: z.lazy(() => ConnectionTypeSchema).array()
}).strict();

export const ProfileCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.ProfileCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutUserInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional()
}).strict();

export const DatingProfileCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.DatingProfileCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => DatingProfileCreateWithoutUserInputSchema),z.lazy(() => DatingProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DatingProfileCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => DatingProfileWhereUniqueInputSchema).optional()
}).strict();

export const ProfileImageCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ProfileImageCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ProfileImageCreateWithoutUserInputSchema),z.lazy(() => ProfileImageCreateWithoutUserInputSchema).array(),z.lazy(() => ProfileImageUncheckedCreateWithoutUserInputSchema),z.lazy(() => ProfileImageUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfileImageCreateOrConnectWithoutUserInputSchema),z.lazy(() => ProfileImageCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProfileImageCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProfileImageWhereUniqueInputSchema),z.lazy(() => ProfileImageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ConnectionRequestCreateNestedManyWithoutFromUserInputSchema: z.ZodType<Prisma.ConnectionRequestCreateNestedManyWithoutFromUserInput> = z.object({
  create: z.union([ z.lazy(() => ConnectionRequestCreateWithoutFromUserInputSchema),z.lazy(() => ConnectionRequestCreateWithoutFromUserInputSchema).array(),z.lazy(() => ConnectionRequestUncheckedCreateWithoutFromUserInputSchema),z.lazy(() => ConnectionRequestUncheckedCreateWithoutFromUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConnectionRequestCreateOrConnectWithoutFromUserInputSchema),z.lazy(() => ConnectionRequestCreateOrConnectWithoutFromUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConnectionRequestCreateManyFromUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ConnectionRequestWhereUniqueInputSchema),z.lazy(() => ConnectionRequestWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ConnectionRequestCreateNestedManyWithoutToUserInputSchema: z.ZodType<Prisma.ConnectionRequestCreateNestedManyWithoutToUserInput> = z.object({
  create: z.union([ z.lazy(() => ConnectionRequestCreateWithoutToUserInputSchema),z.lazy(() => ConnectionRequestCreateWithoutToUserInputSchema).array(),z.lazy(() => ConnectionRequestUncheckedCreateWithoutToUserInputSchema),z.lazy(() => ConnectionRequestUncheckedCreateWithoutToUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConnectionRequestCreateOrConnectWithoutToUserInputSchema),z.lazy(() => ConnectionRequestCreateOrConnectWithoutToUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConnectionRequestCreateManyToUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ConnectionRequestWhereUniqueInputSchema),z.lazy(() => ConnectionRequestWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProfileUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.ProfileUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutUserInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional()
}).strict();

export const DatingProfileUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.DatingProfileUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => DatingProfileCreateWithoutUserInputSchema),z.lazy(() => DatingProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DatingProfileCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => DatingProfileWhereUniqueInputSchema).optional()
}).strict();

export const ProfileImageUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ProfileImageUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ProfileImageCreateWithoutUserInputSchema),z.lazy(() => ProfileImageCreateWithoutUserInputSchema).array(),z.lazy(() => ProfileImageUncheckedCreateWithoutUserInputSchema),z.lazy(() => ProfileImageUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfileImageCreateOrConnectWithoutUserInputSchema),z.lazy(() => ProfileImageCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProfileImageCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProfileImageWhereUniqueInputSchema),z.lazy(() => ProfileImageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ConnectionRequestUncheckedCreateNestedManyWithoutFromUserInputSchema: z.ZodType<Prisma.ConnectionRequestUncheckedCreateNestedManyWithoutFromUserInput> = z.object({
  create: z.union([ z.lazy(() => ConnectionRequestCreateWithoutFromUserInputSchema),z.lazy(() => ConnectionRequestCreateWithoutFromUserInputSchema).array(),z.lazy(() => ConnectionRequestUncheckedCreateWithoutFromUserInputSchema),z.lazy(() => ConnectionRequestUncheckedCreateWithoutFromUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConnectionRequestCreateOrConnectWithoutFromUserInputSchema),z.lazy(() => ConnectionRequestCreateOrConnectWithoutFromUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConnectionRequestCreateManyFromUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ConnectionRequestWhereUniqueInputSchema),z.lazy(() => ConnectionRequestWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ConnectionRequestUncheckedCreateNestedManyWithoutToUserInputSchema: z.ZodType<Prisma.ConnectionRequestUncheckedCreateNestedManyWithoutToUserInput> = z.object({
  create: z.union([ z.lazy(() => ConnectionRequestCreateWithoutToUserInputSchema),z.lazy(() => ConnectionRequestCreateWithoutToUserInputSchema).array(),z.lazy(() => ConnectionRequestUncheckedCreateWithoutToUserInputSchema),z.lazy(() => ConnectionRequestUncheckedCreateWithoutToUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConnectionRequestCreateOrConnectWithoutToUserInputSchema),z.lazy(() => ConnectionRequestCreateOrConnectWithoutToUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConnectionRequestCreateManyToUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ConnectionRequestWhereUniqueInputSchema),z.lazy(() => ConnectionRequestWhereUniqueInputSchema).array() ]).optional(),
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

export const UserUpdatelookingForInputSchema: z.ZodType<Prisma.UserUpdatelookingForInput> = z.object({
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

export const ProfileUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.ProfileUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutUserInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => ProfileUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProfileUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => ProfileUpdateWithoutUserInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const DatingProfileUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.DatingProfileUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => DatingProfileCreateWithoutUserInputSchema),z.lazy(() => DatingProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DatingProfileCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => DatingProfileUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => DatingProfileWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => DatingProfileWhereInputSchema) ]).optional(),
  connect: z.lazy(() => DatingProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DatingProfileUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => DatingProfileUpdateWithoutUserInputSchema),z.lazy(() => DatingProfileUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const ProfileImageUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ProfileImageUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfileImageCreateWithoutUserInputSchema),z.lazy(() => ProfileImageCreateWithoutUserInputSchema).array(),z.lazy(() => ProfileImageUncheckedCreateWithoutUserInputSchema),z.lazy(() => ProfileImageUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfileImageCreateOrConnectWithoutUserInputSchema),z.lazy(() => ProfileImageCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProfileImageUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ProfileImageUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProfileImageCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProfileImageWhereUniqueInputSchema),z.lazy(() => ProfileImageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProfileImageWhereUniqueInputSchema),z.lazy(() => ProfileImageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProfileImageWhereUniqueInputSchema),z.lazy(() => ProfileImageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProfileImageWhereUniqueInputSchema),z.lazy(() => ProfileImageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProfileImageUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ProfileImageUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProfileImageUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ProfileImageUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProfileImageScalarWhereInputSchema),z.lazy(() => ProfileImageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ConnectionRequestUpdateManyWithoutFromUserNestedInputSchema: z.ZodType<Prisma.ConnectionRequestUpdateManyWithoutFromUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ConnectionRequestCreateWithoutFromUserInputSchema),z.lazy(() => ConnectionRequestCreateWithoutFromUserInputSchema).array(),z.lazy(() => ConnectionRequestUncheckedCreateWithoutFromUserInputSchema),z.lazy(() => ConnectionRequestUncheckedCreateWithoutFromUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConnectionRequestCreateOrConnectWithoutFromUserInputSchema),z.lazy(() => ConnectionRequestCreateOrConnectWithoutFromUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ConnectionRequestUpsertWithWhereUniqueWithoutFromUserInputSchema),z.lazy(() => ConnectionRequestUpsertWithWhereUniqueWithoutFromUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConnectionRequestCreateManyFromUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ConnectionRequestWhereUniqueInputSchema),z.lazy(() => ConnectionRequestWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ConnectionRequestWhereUniqueInputSchema),z.lazy(() => ConnectionRequestWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ConnectionRequestWhereUniqueInputSchema),z.lazy(() => ConnectionRequestWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ConnectionRequestWhereUniqueInputSchema),z.lazy(() => ConnectionRequestWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ConnectionRequestUpdateWithWhereUniqueWithoutFromUserInputSchema),z.lazy(() => ConnectionRequestUpdateWithWhereUniqueWithoutFromUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ConnectionRequestUpdateManyWithWhereWithoutFromUserInputSchema),z.lazy(() => ConnectionRequestUpdateManyWithWhereWithoutFromUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ConnectionRequestScalarWhereInputSchema),z.lazy(() => ConnectionRequestScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ConnectionRequestUpdateManyWithoutToUserNestedInputSchema: z.ZodType<Prisma.ConnectionRequestUpdateManyWithoutToUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ConnectionRequestCreateWithoutToUserInputSchema),z.lazy(() => ConnectionRequestCreateWithoutToUserInputSchema).array(),z.lazy(() => ConnectionRequestUncheckedCreateWithoutToUserInputSchema),z.lazy(() => ConnectionRequestUncheckedCreateWithoutToUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConnectionRequestCreateOrConnectWithoutToUserInputSchema),z.lazy(() => ConnectionRequestCreateOrConnectWithoutToUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ConnectionRequestUpsertWithWhereUniqueWithoutToUserInputSchema),z.lazy(() => ConnectionRequestUpsertWithWhereUniqueWithoutToUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConnectionRequestCreateManyToUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ConnectionRequestWhereUniqueInputSchema),z.lazy(() => ConnectionRequestWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ConnectionRequestWhereUniqueInputSchema),z.lazy(() => ConnectionRequestWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ConnectionRequestWhereUniqueInputSchema),z.lazy(() => ConnectionRequestWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ConnectionRequestWhereUniqueInputSchema),z.lazy(() => ConnectionRequestWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ConnectionRequestUpdateWithWhereUniqueWithoutToUserInputSchema),z.lazy(() => ConnectionRequestUpdateWithWhereUniqueWithoutToUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ConnectionRequestUpdateManyWithWhereWithoutToUserInputSchema),z.lazy(() => ConnectionRequestUpdateManyWithWhereWithoutToUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ConnectionRequestScalarWhereInputSchema),z.lazy(() => ConnectionRequestScalarWhereInputSchema).array() ]).optional(),
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

export const DatingProfileUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.DatingProfileUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => DatingProfileCreateWithoutUserInputSchema),z.lazy(() => DatingProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DatingProfileCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => DatingProfileUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => DatingProfileWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => DatingProfileWhereInputSchema) ]).optional(),
  connect: z.lazy(() => DatingProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DatingProfileUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => DatingProfileUpdateWithoutUserInputSchema),z.lazy(() => DatingProfileUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const ProfileImageUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ProfileImageUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfileImageCreateWithoutUserInputSchema),z.lazy(() => ProfileImageCreateWithoutUserInputSchema).array(),z.lazy(() => ProfileImageUncheckedCreateWithoutUserInputSchema),z.lazy(() => ProfileImageUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfileImageCreateOrConnectWithoutUserInputSchema),z.lazy(() => ProfileImageCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProfileImageUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ProfileImageUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProfileImageCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProfileImageWhereUniqueInputSchema),z.lazy(() => ProfileImageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProfileImageWhereUniqueInputSchema),z.lazy(() => ProfileImageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProfileImageWhereUniqueInputSchema),z.lazy(() => ProfileImageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProfileImageWhereUniqueInputSchema),z.lazy(() => ProfileImageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProfileImageUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ProfileImageUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProfileImageUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ProfileImageUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProfileImageScalarWhereInputSchema),z.lazy(() => ProfileImageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ConnectionRequestUncheckedUpdateManyWithoutFromUserNestedInputSchema: z.ZodType<Prisma.ConnectionRequestUncheckedUpdateManyWithoutFromUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ConnectionRequestCreateWithoutFromUserInputSchema),z.lazy(() => ConnectionRequestCreateWithoutFromUserInputSchema).array(),z.lazy(() => ConnectionRequestUncheckedCreateWithoutFromUserInputSchema),z.lazy(() => ConnectionRequestUncheckedCreateWithoutFromUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConnectionRequestCreateOrConnectWithoutFromUserInputSchema),z.lazy(() => ConnectionRequestCreateOrConnectWithoutFromUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ConnectionRequestUpsertWithWhereUniqueWithoutFromUserInputSchema),z.lazy(() => ConnectionRequestUpsertWithWhereUniqueWithoutFromUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConnectionRequestCreateManyFromUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ConnectionRequestWhereUniqueInputSchema),z.lazy(() => ConnectionRequestWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ConnectionRequestWhereUniqueInputSchema),z.lazy(() => ConnectionRequestWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ConnectionRequestWhereUniqueInputSchema),z.lazy(() => ConnectionRequestWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ConnectionRequestWhereUniqueInputSchema),z.lazy(() => ConnectionRequestWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ConnectionRequestUpdateWithWhereUniqueWithoutFromUserInputSchema),z.lazy(() => ConnectionRequestUpdateWithWhereUniqueWithoutFromUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ConnectionRequestUpdateManyWithWhereWithoutFromUserInputSchema),z.lazy(() => ConnectionRequestUpdateManyWithWhereWithoutFromUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ConnectionRequestScalarWhereInputSchema),z.lazy(() => ConnectionRequestScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ConnectionRequestUncheckedUpdateManyWithoutToUserNestedInputSchema: z.ZodType<Prisma.ConnectionRequestUncheckedUpdateManyWithoutToUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ConnectionRequestCreateWithoutToUserInputSchema),z.lazy(() => ConnectionRequestCreateWithoutToUserInputSchema).array(),z.lazy(() => ConnectionRequestUncheckedCreateWithoutToUserInputSchema),z.lazy(() => ConnectionRequestUncheckedCreateWithoutToUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConnectionRequestCreateOrConnectWithoutToUserInputSchema),z.lazy(() => ConnectionRequestCreateOrConnectWithoutToUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ConnectionRequestUpsertWithWhereUniqueWithoutToUserInputSchema),z.lazy(() => ConnectionRequestUpsertWithWhereUniqueWithoutToUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConnectionRequestCreateManyToUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ConnectionRequestWhereUniqueInputSchema),z.lazy(() => ConnectionRequestWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ConnectionRequestWhereUniqueInputSchema),z.lazy(() => ConnectionRequestWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ConnectionRequestWhereUniqueInputSchema),z.lazy(() => ConnectionRequestWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ConnectionRequestWhereUniqueInputSchema),z.lazy(() => ConnectionRequestWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ConnectionRequestUpdateWithWhereUniqueWithoutToUserInputSchema),z.lazy(() => ConnectionRequestUpdateWithWhereUniqueWithoutToUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ConnectionRequestUpdateManyWithWhereWithoutToUserInputSchema),z.lazy(() => ConnectionRequestUpdateManyWithWhereWithoutToUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ConnectionRequestScalarWhereInputSchema),z.lazy(() => ConnectionRequestScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutProfileInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutProfileInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutProfileInputSchema),z.lazy(() => UserUncheckedCreateWithoutProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProfileInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const ProfileTagCreateNestedManyWithoutProfileInputSchema: z.ZodType<Prisma.ProfileTagCreateNestedManyWithoutProfileInput> = z.object({
  create: z.union([ z.lazy(() => ProfileTagCreateWithoutProfileInputSchema),z.lazy(() => ProfileTagCreateWithoutProfileInputSchema).array(),z.lazy(() => ProfileTagUncheckedCreateWithoutProfileInputSchema),z.lazy(() => ProfileTagUncheckedCreateWithoutProfileInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfileTagCreateOrConnectWithoutProfileInputSchema),z.lazy(() => ProfileTagCreateOrConnectWithoutProfileInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProfileTagCreateManyProfileInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProfileTagWhereUniqueInputSchema),z.lazy(() => ProfileTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProfileImageCreateNestedOneWithoutPrimaryForProfileInputSchema: z.ZodType<Prisma.ProfileImageCreateNestedOneWithoutPrimaryForProfileInput> = z.object({
  create: z.union([ z.lazy(() => ProfileImageCreateWithoutPrimaryForProfileInputSchema),z.lazy(() => ProfileImageUncheckedCreateWithoutPrimaryForProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileImageCreateOrConnectWithoutPrimaryForProfileInputSchema).optional(),
  connect: z.lazy(() => ProfileImageWhereUniqueInputSchema).optional()
}).strict();

export const ProfileImageCreateNestedManyWithoutOtherForProfilesInputSchema: z.ZodType<Prisma.ProfileImageCreateNestedManyWithoutOtherForProfilesInput> = z.object({
  create: z.union([ z.lazy(() => ProfileImageCreateWithoutOtherForProfilesInputSchema),z.lazy(() => ProfileImageCreateWithoutOtherForProfilesInputSchema).array(),z.lazy(() => ProfileImageUncheckedCreateWithoutOtherForProfilesInputSchema),z.lazy(() => ProfileImageUncheckedCreateWithoutOtherForProfilesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfileImageCreateOrConnectWithoutOtherForProfilesInputSchema),z.lazy(() => ProfileImageCreateOrConnectWithoutOtherForProfilesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProfileImageWhereUniqueInputSchema),z.lazy(() => ProfileImageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProfileTagUncheckedCreateNestedManyWithoutProfileInputSchema: z.ZodType<Prisma.ProfileTagUncheckedCreateNestedManyWithoutProfileInput> = z.object({
  create: z.union([ z.lazy(() => ProfileTagCreateWithoutProfileInputSchema),z.lazy(() => ProfileTagCreateWithoutProfileInputSchema).array(),z.lazy(() => ProfileTagUncheckedCreateWithoutProfileInputSchema),z.lazy(() => ProfileTagUncheckedCreateWithoutProfileInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfileTagCreateOrConnectWithoutProfileInputSchema),z.lazy(() => ProfileTagCreateOrConnectWithoutProfileInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProfileTagCreateManyProfileInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProfileTagWhereUniqueInputSchema),z.lazy(() => ProfileTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProfileImageUncheckedCreateNestedManyWithoutOtherForProfilesInputSchema: z.ZodType<Prisma.ProfileImageUncheckedCreateNestedManyWithoutOtherForProfilesInput> = z.object({
  create: z.union([ z.lazy(() => ProfileImageCreateWithoutOtherForProfilesInputSchema),z.lazy(() => ProfileImageCreateWithoutOtherForProfilesInputSchema).array(),z.lazy(() => ProfileImageUncheckedCreateWithoutOtherForProfilesInputSchema),z.lazy(() => ProfileImageUncheckedCreateWithoutOtherForProfilesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfileImageCreateOrConnectWithoutOtherForProfilesInputSchema),z.lazy(() => ProfileImageCreateOrConnectWithoutOtherForProfilesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProfileImageWhereUniqueInputSchema),z.lazy(() => ProfileImageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutProfileNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutProfileNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutProfileInputSchema),z.lazy(() => UserUncheckedCreateWithoutProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProfileInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutProfileInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutProfileInputSchema),z.lazy(() => UserUpdateWithoutProfileInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProfileInputSchema) ]).optional(),
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

export const ProfileImageUpdateOneWithoutPrimaryForProfileNestedInputSchema: z.ZodType<Prisma.ProfileImageUpdateOneWithoutPrimaryForProfileNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfileImageCreateWithoutPrimaryForProfileInputSchema),z.lazy(() => ProfileImageUncheckedCreateWithoutPrimaryForProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileImageCreateOrConnectWithoutPrimaryForProfileInputSchema).optional(),
  upsert: z.lazy(() => ProfileImageUpsertWithoutPrimaryForProfileInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ProfileImageWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ProfileImageWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ProfileImageWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProfileImageUpdateToOneWithWhereWithoutPrimaryForProfileInputSchema),z.lazy(() => ProfileImageUpdateWithoutPrimaryForProfileInputSchema),z.lazy(() => ProfileImageUncheckedUpdateWithoutPrimaryForProfileInputSchema) ]).optional(),
}).strict();

export const ProfileImageUpdateManyWithoutOtherForProfilesNestedInputSchema: z.ZodType<Prisma.ProfileImageUpdateManyWithoutOtherForProfilesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfileImageCreateWithoutOtherForProfilesInputSchema),z.lazy(() => ProfileImageCreateWithoutOtherForProfilesInputSchema).array(),z.lazy(() => ProfileImageUncheckedCreateWithoutOtherForProfilesInputSchema),z.lazy(() => ProfileImageUncheckedCreateWithoutOtherForProfilesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfileImageCreateOrConnectWithoutOtherForProfilesInputSchema),z.lazy(() => ProfileImageCreateOrConnectWithoutOtherForProfilesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProfileImageUpsertWithWhereUniqueWithoutOtherForProfilesInputSchema),z.lazy(() => ProfileImageUpsertWithWhereUniqueWithoutOtherForProfilesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => ProfileImageWhereUniqueInputSchema),z.lazy(() => ProfileImageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProfileImageWhereUniqueInputSchema),z.lazy(() => ProfileImageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProfileImageWhereUniqueInputSchema),z.lazy(() => ProfileImageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProfileImageWhereUniqueInputSchema),z.lazy(() => ProfileImageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProfileImageUpdateWithWhereUniqueWithoutOtherForProfilesInputSchema),z.lazy(() => ProfileImageUpdateWithWhereUniqueWithoutOtherForProfilesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProfileImageUpdateManyWithWhereWithoutOtherForProfilesInputSchema),z.lazy(() => ProfileImageUpdateManyWithWhereWithoutOtherForProfilesInputSchema).array() ]).optional(),
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

export const ProfileImageUncheckedUpdateManyWithoutOtherForProfilesNestedInputSchema: z.ZodType<Prisma.ProfileImageUncheckedUpdateManyWithoutOtherForProfilesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfileImageCreateWithoutOtherForProfilesInputSchema),z.lazy(() => ProfileImageCreateWithoutOtherForProfilesInputSchema).array(),z.lazy(() => ProfileImageUncheckedCreateWithoutOtherForProfilesInputSchema),z.lazy(() => ProfileImageUncheckedCreateWithoutOtherForProfilesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfileImageCreateOrConnectWithoutOtherForProfilesInputSchema),z.lazy(() => ProfileImageCreateOrConnectWithoutOtherForProfilesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProfileImageUpsertWithWhereUniqueWithoutOtherForProfilesInputSchema),z.lazy(() => ProfileImageUpsertWithWhereUniqueWithoutOtherForProfilesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => ProfileImageWhereUniqueInputSchema),z.lazy(() => ProfileImageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProfileImageWhereUniqueInputSchema),z.lazy(() => ProfileImageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProfileImageWhereUniqueInputSchema),z.lazy(() => ProfileImageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProfileImageWhereUniqueInputSchema),z.lazy(() => ProfileImageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProfileImageUpdateWithWhereUniqueWithoutOtherForProfilesInputSchema),z.lazy(() => ProfileImageUpdateWithWhereUniqueWithoutOtherForProfilesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProfileImageUpdateManyWithWhereWithoutOtherForProfilesInputSchema),z.lazy(() => ProfileImageUpdateManyWithWhereWithoutOtherForProfilesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProfileImageScalarWhereInputSchema),z.lazy(() => ProfileImageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutDatingProfileInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutDatingProfileInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutDatingProfileInputSchema),z.lazy(() => UserUncheckedCreateWithoutDatingProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutDatingProfileInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const DatingPreferenceCreateNestedOneWithoutProfileInputSchema: z.ZodType<Prisma.DatingPreferenceCreateNestedOneWithoutProfileInput> = z.object({
  create: z.union([ z.lazy(() => DatingPreferenceCreateWithoutProfileInputSchema),z.lazy(() => DatingPreferenceUncheckedCreateWithoutProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DatingPreferenceCreateOrConnectWithoutProfileInputSchema).optional(),
  connect: z.lazy(() => DatingPreferenceWhereUniqueInputSchema).optional()
}).strict();

export const DatingProfileTagCreateNestedManyWithoutDatingProfileInputSchema: z.ZodType<Prisma.DatingProfileTagCreateNestedManyWithoutDatingProfileInput> = z.object({
  create: z.union([ z.lazy(() => DatingProfileTagCreateWithoutDatingProfileInputSchema),z.lazy(() => DatingProfileTagCreateWithoutDatingProfileInputSchema).array(),z.lazy(() => DatingProfileTagUncheckedCreateWithoutDatingProfileInputSchema),z.lazy(() => DatingProfileTagUncheckedCreateWithoutDatingProfileInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DatingProfileTagCreateOrConnectWithoutDatingProfileInputSchema),z.lazy(() => DatingProfileTagCreateOrConnectWithoutDatingProfileInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DatingProfileTagCreateManyDatingProfileInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DatingProfileTagWhereUniqueInputSchema),z.lazy(() => DatingProfileTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProfileImageCreateNestedOneWithoutPrimaryForDatingProfileInputSchema: z.ZodType<Prisma.ProfileImageCreateNestedOneWithoutPrimaryForDatingProfileInput> = z.object({
  create: z.union([ z.lazy(() => ProfileImageCreateWithoutPrimaryForDatingProfileInputSchema),z.lazy(() => ProfileImageUncheckedCreateWithoutPrimaryForDatingProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileImageCreateOrConnectWithoutPrimaryForDatingProfileInputSchema).optional(),
  connect: z.lazy(() => ProfileImageWhereUniqueInputSchema).optional()
}).strict();

export const ProfileImageCreateNestedManyWithoutOtherForDatingProfilesInputSchema: z.ZodType<Prisma.ProfileImageCreateNestedManyWithoutOtherForDatingProfilesInput> = z.object({
  create: z.union([ z.lazy(() => ProfileImageCreateWithoutOtherForDatingProfilesInputSchema),z.lazy(() => ProfileImageCreateWithoutOtherForDatingProfilesInputSchema).array(),z.lazy(() => ProfileImageUncheckedCreateWithoutOtherForDatingProfilesInputSchema),z.lazy(() => ProfileImageUncheckedCreateWithoutOtherForDatingProfilesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfileImageCreateOrConnectWithoutOtherForDatingProfilesInputSchema),z.lazy(() => ProfileImageCreateOrConnectWithoutOtherForDatingProfilesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProfileImageWhereUniqueInputSchema),z.lazy(() => ProfileImageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DatingPreferenceUncheckedCreateNestedOneWithoutProfileInputSchema: z.ZodType<Prisma.DatingPreferenceUncheckedCreateNestedOneWithoutProfileInput> = z.object({
  create: z.union([ z.lazy(() => DatingPreferenceCreateWithoutProfileInputSchema),z.lazy(() => DatingPreferenceUncheckedCreateWithoutProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DatingPreferenceCreateOrConnectWithoutProfileInputSchema).optional(),
  connect: z.lazy(() => DatingPreferenceWhereUniqueInputSchema).optional()
}).strict();

export const DatingProfileTagUncheckedCreateNestedManyWithoutDatingProfileInputSchema: z.ZodType<Prisma.DatingProfileTagUncheckedCreateNestedManyWithoutDatingProfileInput> = z.object({
  create: z.union([ z.lazy(() => DatingProfileTagCreateWithoutDatingProfileInputSchema),z.lazy(() => DatingProfileTagCreateWithoutDatingProfileInputSchema).array(),z.lazy(() => DatingProfileTagUncheckedCreateWithoutDatingProfileInputSchema),z.lazy(() => DatingProfileTagUncheckedCreateWithoutDatingProfileInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DatingProfileTagCreateOrConnectWithoutDatingProfileInputSchema),z.lazy(() => DatingProfileTagCreateOrConnectWithoutDatingProfileInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DatingProfileTagCreateManyDatingProfileInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DatingProfileTagWhereUniqueInputSchema),z.lazy(() => DatingProfileTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProfileImageUncheckedCreateNestedManyWithoutOtherForDatingProfilesInputSchema: z.ZodType<Prisma.ProfileImageUncheckedCreateNestedManyWithoutOtherForDatingProfilesInput> = z.object({
  create: z.union([ z.lazy(() => ProfileImageCreateWithoutOtherForDatingProfilesInputSchema),z.lazy(() => ProfileImageCreateWithoutOtherForDatingProfilesInputSchema).array(),z.lazy(() => ProfileImageUncheckedCreateWithoutOtherForDatingProfilesInputSchema),z.lazy(() => ProfileImageUncheckedCreateWithoutOtherForDatingProfilesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfileImageCreateOrConnectWithoutOtherForDatingProfilesInputSchema),z.lazy(() => ProfileImageCreateOrConnectWithoutOtherForDatingProfilesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProfileImageWhereUniqueInputSchema),z.lazy(() => ProfileImageWhereUniqueInputSchema).array() ]).optional(),
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

export const UserUpdateOneRequiredWithoutDatingProfileNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutDatingProfileNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutDatingProfileInputSchema),z.lazy(() => UserUncheckedCreateWithoutDatingProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutDatingProfileInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutDatingProfileInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutDatingProfileInputSchema),z.lazy(() => UserUpdateWithoutDatingProfileInputSchema),z.lazy(() => UserUncheckedUpdateWithoutDatingProfileInputSchema) ]).optional(),
}).strict();

export const DatingPreferenceUpdateOneWithoutProfileNestedInputSchema: z.ZodType<Prisma.DatingPreferenceUpdateOneWithoutProfileNestedInput> = z.object({
  create: z.union([ z.lazy(() => DatingPreferenceCreateWithoutProfileInputSchema),z.lazy(() => DatingPreferenceUncheckedCreateWithoutProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DatingPreferenceCreateOrConnectWithoutProfileInputSchema).optional(),
  upsert: z.lazy(() => DatingPreferenceUpsertWithoutProfileInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => DatingPreferenceWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => DatingPreferenceWhereInputSchema) ]).optional(),
  connect: z.lazy(() => DatingPreferenceWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DatingPreferenceUpdateToOneWithWhereWithoutProfileInputSchema),z.lazy(() => DatingPreferenceUpdateWithoutProfileInputSchema),z.lazy(() => DatingPreferenceUncheckedUpdateWithoutProfileInputSchema) ]).optional(),
}).strict();

export const DatingProfileTagUpdateManyWithoutDatingProfileNestedInputSchema: z.ZodType<Prisma.DatingProfileTagUpdateManyWithoutDatingProfileNestedInput> = z.object({
  create: z.union([ z.lazy(() => DatingProfileTagCreateWithoutDatingProfileInputSchema),z.lazy(() => DatingProfileTagCreateWithoutDatingProfileInputSchema).array(),z.lazy(() => DatingProfileTagUncheckedCreateWithoutDatingProfileInputSchema),z.lazy(() => DatingProfileTagUncheckedCreateWithoutDatingProfileInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DatingProfileTagCreateOrConnectWithoutDatingProfileInputSchema),z.lazy(() => DatingProfileTagCreateOrConnectWithoutDatingProfileInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DatingProfileTagUpsertWithWhereUniqueWithoutDatingProfileInputSchema),z.lazy(() => DatingProfileTagUpsertWithWhereUniqueWithoutDatingProfileInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DatingProfileTagCreateManyDatingProfileInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DatingProfileTagWhereUniqueInputSchema),z.lazy(() => DatingProfileTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DatingProfileTagWhereUniqueInputSchema),z.lazy(() => DatingProfileTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DatingProfileTagWhereUniqueInputSchema),z.lazy(() => DatingProfileTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DatingProfileTagWhereUniqueInputSchema),z.lazy(() => DatingProfileTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DatingProfileTagUpdateWithWhereUniqueWithoutDatingProfileInputSchema),z.lazy(() => DatingProfileTagUpdateWithWhereUniqueWithoutDatingProfileInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DatingProfileTagUpdateManyWithWhereWithoutDatingProfileInputSchema),z.lazy(() => DatingProfileTagUpdateManyWithWhereWithoutDatingProfileInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DatingProfileTagScalarWhereInputSchema),z.lazy(() => DatingProfileTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProfileImageUpdateOneWithoutPrimaryForDatingProfileNestedInputSchema: z.ZodType<Prisma.ProfileImageUpdateOneWithoutPrimaryForDatingProfileNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfileImageCreateWithoutPrimaryForDatingProfileInputSchema),z.lazy(() => ProfileImageUncheckedCreateWithoutPrimaryForDatingProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileImageCreateOrConnectWithoutPrimaryForDatingProfileInputSchema).optional(),
  upsert: z.lazy(() => ProfileImageUpsertWithoutPrimaryForDatingProfileInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ProfileImageWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ProfileImageWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ProfileImageWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProfileImageUpdateToOneWithWhereWithoutPrimaryForDatingProfileInputSchema),z.lazy(() => ProfileImageUpdateWithoutPrimaryForDatingProfileInputSchema),z.lazy(() => ProfileImageUncheckedUpdateWithoutPrimaryForDatingProfileInputSchema) ]).optional(),
}).strict();

export const ProfileImageUpdateManyWithoutOtherForDatingProfilesNestedInputSchema: z.ZodType<Prisma.ProfileImageUpdateManyWithoutOtherForDatingProfilesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfileImageCreateWithoutOtherForDatingProfilesInputSchema),z.lazy(() => ProfileImageCreateWithoutOtherForDatingProfilesInputSchema).array(),z.lazy(() => ProfileImageUncheckedCreateWithoutOtherForDatingProfilesInputSchema),z.lazy(() => ProfileImageUncheckedCreateWithoutOtherForDatingProfilesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfileImageCreateOrConnectWithoutOtherForDatingProfilesInputSchema),z.lazy(() => ProfileImageCreateOrConnectWithoutOtherForDatingProfilesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProfileImageUpsertWithWhereUniqueWithoutOtherForDatingProfilesInputSchema),z.lazy(() => ProfileImageUpsertWithWhereUniqueWithoutOtherForDatingProfilesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => ProfileImageWhereUniqueInputSchema),z.lazy(() => ProfileImageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProfileImageWhereUniqueInputSchema),z.lazy(() => ProfileImageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProfileImageWhereUniqueInputSchema),z.lazy(() => ProfileImageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProfileImageWhereUniqueInputSchema),z.lazy(() => ProfileImageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProfileImageUpdateWithWhereUniqueWithoutOtherForDatingProfilesInputSchema),z.lazy(() => ProfileImageUpdateWithWhereUniqueWithoutOtherForDatingProfilesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProfileImageUpdateManyWithWhereWithoutOtherForDatingProfilesInputSchema),z.lazy(() => ProfileImageUpdateManyWithWhereWithoutOtherForDatingProfilesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProfileImageScalarWhereInputSchema),z.lazy(() => ProfileImageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DatingPreferenceUncheckedUpdateOneWithoutProfileNestedInputSchema: z.ZodType<Prisma.DatingPreferenceUncheckedUpdateOneWithoutProfileNestedInput> = z.object({
  create: z.union([ z.lazy(() => DatingPreferenceCreateWithoutProfileInputSchema),z.lazy(() => DatingPreferenceUncheckedCreateWithoutProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DatingPreferenceCreateOrConnectWithoutProfileInputSchema).optional(),
  upsert: z.lazy(() => DatingPreferenceUpsertWithoutProfileInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => DatingPreferenceWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => DatingPreferenceWhereInputSchema) ]).optional(),
  connect: z.lazy(() => DatingPreferenceWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DatingPreferenceUpdateToOneWithWhereWithoutProfileInputSchema),z.lazy(() => DatingPreferenceUpdateWithoutProfileInputSchema),z.lazy(() => DatingPreferenceUncheckedUpdateWithoutProfileInputSchema) ]).optional(),
}).strict();

export const DatingProfileTagUncheckedUpdateManyWithoutDatingProfileNestedInputSchema: z.ZodType<Prisma.DatingProfileTagUncheckedUpdateManyWithoutDatingProfileNestedInput> = z.object({
  create: z.union([ z.lazy(() => DatingProfileTagCreateWithoutDatingProfileInputSchema),z.lazy(() => DatingProfileTagCreateWithoutDatingProfileInputSchema).array(),z.lazy(() => DatingProfileTagUncheckedCreateWithoutDatingProfileInputSchema),z.lazy(() => DatingProfileTagUncheckedCreateWithoutDatingProfileInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DatingProfileTagCreateOrConnectWithoutDatingProfileInputSchema),z.lazy(() => DatingProfileTagCreateOrConnectWithoutDatingProfileInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DatingProfileTagUpsertWithWhereUniqueWithoutDatingProfileInputSchema),z.lazy(() => DatingProfileTagUpsertWithWhereUniqueWithoutDatingProfileInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DatingProfileTagCreateManyDatingProfileInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DatingProfileTagWhereUniqueInputSchema),z.lazy(() => DatingProfileTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DatingProfileTagWhereUniqueInputSchema),z.lazy(() => DatingProfileTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DatingProfileTagWhereUniqueInputSchema),z.lazy(() => DatingProfileTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DatingProfileTagWhereUniqueInputSchema),z.lazy(() => DatingProfileTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DatingProfileTagUpdateWithWhereUniqueWithoutDatingProfileInputSchema),z.lazy(() => DatingProfileTagUpdateWithWhereUniqueWithoutDatingProfileInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DatingProfileTagUpdateManyWithWhereWithoutDatingProfileInputSchema),z.lazy(() => DatingProfileTagUpdateManyWithWhereWithoutDatingProfileInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DatingProfileTagScalarWhereInputSchema),z.lazy(() => DatingProfileTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProfileImageUncheckedUpdateManyWithoutOtherForDatingProfilesNestedInputSchema: z.ZodType<Prisma.ProfileImageUncheckedUpdateManyWithoutOtherForDatingProfilesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfileImageCreateWithoutOtherForDatingProfilesInputSchema),z.lazy(() => ProfileImageCreateWithoutOtherForDatingProfilesInputSchema).array(),z.lazy(() => ProfileImageUncheckedCreateWithoutOtherForDatingProfilesInputSchema),z.lazy(() => ProfileImageUncheckedCreateWithoutOtherForDatingProfilesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfileImageCreateOrConnectWithoutOtherForDatingProfilesInputSchema),z.lazy(() => ProfileImageCreateOrConnectWithoutOtherForDatingProfilesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProfileImageUpsertWithWhereUniqueWithoutOtherForDatingProfilesInputSchema),z.lazy(() => ProfileImageUpsertWithWhereUniqueWithoutOtherForDatingProfilesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => ProfileImageWhereUniqueInputSchema),z.lazy(() => ProfileImageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProfileImageWhereUniqueInputSchema),z.lazy(() => ProfileImageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProfileImageWhereUniqueInputSchema),z.lazy(() => ProfileImageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProfileImageWhereUniqueInputSchema),z.lazy(() => ProfileImageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProfileImageUpdateWithWhereUniqueWithoutOtherForDatingProfilesInputSchema),z.lazy(() => ProfileImageUpdateWithWhereUniqueWithoutOtherForDatingProfilesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProfileImageUpdateManyWithWhereWithoutOtherForDatingProfilesInputSchema),z.lazy(() => ProfileImageUpdateManyWithWhereWithoutOtherForDatingProfilesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProfileImageScalarWhereInputSchema),z.lazy(() => ProfileImageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutProfileImageInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutProfileImageInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutProfileImageInputSchema),z.lazy(() => UserUncheckedCreateWithoutProfileImageInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProfileImageInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const ProfileCreateNestedOneWithoutProfileImageInputSchema: z.ZodType<Prisma.ProfileCreateNestedOneWithoutProfileImageInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutProfileImageInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutProfileImageInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutProfileImageInputSchema).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional()
}).strict();

export const ProfileCreateNestedManyWithoutOtherImagesInputSchema: z.ZodType<Prisma.ProfileCreateNestedManyWithoutOtherImagesInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutOtherImagesInputSchema),z.lazy(() => ProfileCreateWithoutOtherImagesInputSchema).array(),z.lazy(() => ProfileUncheckedCreateWithoutOtherImagesInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutOtherImagesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfileCreateOrConnectWithoutOtherImagesInputSchema),z.lazy(() => ProfileCreateOrConnectWithoutOtherImagesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProfileWhereUniqueInputSchema),z.lazy(() => ProfileWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DatingProfileCreateNestedOneWithoutProfileImageInputSchema: z.ZodType<Prisma.DatingProfileCreateNestedOneWithoutProfileImageInput> = z.object({
  create: z.union([ z.lazy(() => DatingProfileCreateWithoutProfileImageInputSchema),z.lazy(() => DatingProfileUncheckedCreateWithoutProfileImageInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DatingProfileCreateOrConnectWithoutProfileImageInputSchema).optional(),
  connect: z.lazy(() => DatingProfileWhereUniqueInputSchema).optional()
}).strict();

export const DatingProfileCreateNestedManyWithoutOtherImagesInputSchema: z.ZodType<Prisma.DatingProfileCreateNestedManyWithoutOtherImagesInput> = z.object({
  create: z.union([ z.lazy(() => DatingProfileCreateWithoutOtherImagesInputSchema),z.lazy(() => DatingProfileCreateWithoutOtherImagesInputSchema).array(),z.lazy(() => DatingProfileUncheckedCreateWithoutOtherImagesInputSchema),z.lazy(() => DatingProfileUncheckedCreateWithoutOtherImagesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DatingProfileCreateOrConnectWithoutOtherImagesInputSchema),z.lazy(() => DatingProfileCreateOrConnectWithoutOtherImagesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DatingProfileWhereUniqueInputSchema),z.lazy(() => DatingProfileWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProfileUncheckedCreateNestedOneWithoutProfileImageInputSchema: z.ZodType<Prisma.ProfileUncheckedCreateNestedOneWithoutProfileImageInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutProfileImageInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutProfileImageInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutProfileImageInputSchema).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional()
}).strict();

export const ProfileUncheckedCreateNestedManyWithoutOtherImagesInputSchema: z.ZodType<Prisma.ProfileUncheckedCreateNestedManyWithoutOtherImagesInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutOtherImagesInputSchema),z.lazy(() => ProfileCreateWithoutOtherImagesInputSchema).array(),z.lazy(() => ProfileUncheckedCreateWithoutOtherImagesInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutOtherImagesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfileCreateOrConnectWithoutOtherImagesInputSchema),z.lazy(() => ProfileCreateOrConnectWithoutOtherImagesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProfileWhereUniqueInputSchema),z.lazy(() => ProfileWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DatingProfileUncheckedCreateNestedOneWithoutProfileImageInputSchema: z.ZodType<Prisma.DatingProfileUncheckedCreateNestedOneWithoutProfileImageInput> = z.object({
  create: z.union([ z.lazy(() => DatingProfileCreateWithoutProfileImageInputSchema),z.lazy(() => DatingProfileUncheckedCreateWithoutProfileImageInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DatingProfileCreateOrConnectWithoutProfileImageInputSchema).optional(),
  connect: z.lazy(() => DatingProfileWhereUniqueInputSchema).optional()
}).strict();

export const DatingProfileUncheckedCreateNestedManyWithoutOtherImagesInputSchema: z.ZodType<Prisma.DatingProfileUncheckedCreateNestedManyWithoutOtherImagesInput> = z.object({
  create: z.union([ z.lazy(() => DatingProfileCreateWithoutOtherImagesInputSchema),z.lazy(() => DatingProfileCreateWithoutOtherImagesInputSchema).array(),z.lazy(() => DatingProfileUncheckedCreateWithoutOtherImagesInputSchema),z.lazy(() => DatingProfileUncheckedCreateWithoutOtherImagesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DatingProfileCreateOrConnectWithoutOtherImagesInputSchema),z.lazy(() => DatingProfileCreateOrConnectWithoutOtherImagesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DatingProfileWhereUniqueInputSchema),z.lazy(() => DatingProfileWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutProfileImageNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutProfileImageNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutProfileImageInputSchema),z.lazy(() => UserUncheckedCreateWithoutProfileImageInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProfileImageInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutProfileImageInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutProfileImageInputSchema),z.lazy(() => UserUpdateWithoutProfileImageInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProfileImageInputSchema) ]).optional(),
}).strict();

export const ProfileUpdateOneWithoutProfileImageNestedInputSchema: z.ZodType<Prisma.ProfileUpdateOneWithoutProfileImageNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutProfileImageInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutProfileImageInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutProfileImageInputSchema).optional(),
  upsert: z.lazy(() => ProfileUpsertWithoutProfileImageInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProfileUpdateToOneWithWhereWithoutProfileImageInputSchema),z.lazy(() => ProfileUpdateWithoutProfileImageInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutProfileImageInputSchema) ]).optional(),
}).strict();

export const ProfileUpdateManyWithoutOtherImagesNestedInputSchema: z.ZodType<Prisma.ProfileUpdateManyWithoutOtherImagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutOtherImagesInputSchema),z.lazy(() => ProfileCreateWithoutOtherImagesInputSchema).array(),z.lazy(() => ProfileUncheckedCreateWithoutOtherImagesInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutOtherImagesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfileCreateOrConnectWithoutOtherImagesInputSchema),z.lazy(() => ProfileCreateOrConnectWithoutOtherImagesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProfileUpsertWithWhereUniqueWithoutOtherImagesInputSchema),z.lazy(() => ProfileUpsertWithWhereUniqueWithoutOtherImagesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => ProfileWhereUniqueInputSchema),z.lazy(() => ProfileWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProfileWhereUniqueInputSchema),z.lazy(() => ProfileWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProfileWhereUniqueInputSchema),z.lazy(() => ProfileWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProfileWhereUniqueInputSchema),z.lazy(() => ProfileWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProfileUpdateWithWhereUniqueWithoutOtherImagesInputSchema),z.lazy(() => ProfileUpdateWithWhereUniqueWithoutOtherImagesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProfileUpdateManyWithWhereWithoutOtherImagesInputSchema),z.lazy(() => ProfileUpdateManyWithWhereWithoutOtherImagesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProfileScalarWhereInputSchema),z.lazy(() => ProfileScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DatingProfileUpdateOneWithoutProfileImageNestedInputSchema: z.ZodType<Prisma.DatingProfileUpdateOneWithoutProfileImageNestedInput> = z.object({
  create: z.union([ z.lazy(() => DatingProfileCreateWithoutProfileImageInputSchema),z.lazy(() => DatingProfileUncheckedCreateWithoutProfileImageInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DatingProfileCreateOrConnectWithoutProfileImageInputSchema).optional(),
  upsert: z.lazy(() => DatingProfileUpsertWithoutProfileImageInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => DatingProfileWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => DatingProfileWhereInputSchema) ]).optional(),
  connect: z.lazy(() => DatingProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DatingProfileUpdateToOneWithWhereWithoutProfileImageInputSchema),z.lazy(() => DatingProfileUpdateWithoutProfileImageInputSchema),z.lazy(() => DatingProfileUncheckedUpdateWithoutProfileImageInputSchema) ]).optional(),
}).strict();

export const DatingProfileUpdateManyWithoutOtherImagesNestedInputSchema: z.ZodType<Prisma.DatingProfileUpdateManyWithoutOtherImagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => DatingProfileCreateWithoutOtherImagesInputSchema),z.lazy(() => DatingProfileCreateWithoutOtherImagesInputSchema).array(),z.lazy(() => DatingProfileUncheckedCreateWithoutOtherImagesInputSchema),z.lazy(() => DatingProfileUncheckedCreateWithoutOtherImagesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DatingProfileCreateOrConnectWithoutOtherImagesInputSchema),z.lazy(() => DatingProfileCreateOrConnectWithoutOtherImagesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DatingProfileUpsertWithWhereUniqueWithoutOtherImagesInputSchema),z.lazy(() => DatingProfileUpsertWithWhereUniqueWithoutOtherImagesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => DatingProfileWhereUniqueInputSchema),z.lazy(() => DatingProfileWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DatingProfileWhereUniqueInputSchema),z.lazy(() => DatingProfileWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DatingProfileWhereUniqueInputSchema),z.lazy(() => DatingProfileWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DatingProfileWhereUniqueInputSchema),z.lazy(() => DatingProfileWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DatingProfileUpdateWithWhereUniqueWithoutOtherImagesInputSchema),z.lazy(() => DatingProfileUpdateWithWhereUniqueWithoutOtherImagesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DatingProfileUpdateManyWithWhereWithoutOtherImagesInputSchema),z.lazy(() => DatingProfileUpdateManyWithWhereWithoutOtherImagesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DatingProfileScalarWhereInputSchema),z.lazy(() => DatingProfileScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProfileUncheckedUpdateOneWithoutProfileImageNestedInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateOneWithoutProfileImageNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutProfileImageInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutProfileImageInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutProfileImageInputSchema).optional(),
  upsert: z.lazy(() => ProfileUpsertWithoutProfileImageInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProfileUpdateToOneWithWhereWithoutProfileImageInputSchema),z.lazy(() => ProfileUpdateWithoutProfileImageInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutProfileImageInputSchema) ]).optional(),
}).strict();

export const ProfileUncheckedUpdateManyWithoutOtherImagesNestedInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateManyWithoutOtherImagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutOtherImagesInputSchema),z.lazy(() => ProfileCreateWithoutOtherImagesInputSchema).array(),z.lazy(() => ProfileUncheckedCreateWithoutOtherImagesInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutOtherImagesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfileCreateOrConnectWithoutOtherImagesInputSchema),z.lazy(() => ProfileCreateOrConnectWithoutOtherImagesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProfileUpsertWithWhereUniqueWithoutOtherImagesInputSchema),z.lazy(() => ProfileUpsertWithWhereUniqueWithoutOtherImagesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => ProfileWhereUniqueInputSchema),z.lazy(() => ProfileWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProfileWhereUniqueInputSchema),z.lazy(() => ProfileWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProfileWhereUniqueInputSchema),z.lazy(() => ProfileWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProfileWhereUniqueInputSchema),z.lazy(() => ProfileWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProfileUpdateWithWhereUniqueWithoutOtherImagesInputSchema),z.lazy(() => ProfileUpdateWithWhereUniqueWithoutOtherImagesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProfileUpdateManyWithWhereWithoutOtherImagesInputSchema),z.lazy(() => ProfileUpdateManyWithWhereWithoutOtherImagesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProfileScalarWhereInputSchema),z.lazy(() => ProfileScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DatingProfileUncheckedUpdateOneWithoutProfileImageNestedInputSchema: z.ZodType<Prisma.DatingProfileUncheckedUpdateOneWithoutProfileImageNestedInput> = z.object({
  create: z.union([ z.lazy(() => DatingProfileCreateWithoutProfileImageInputSchema),z.lazy(() => DatingProfileUncheckedCreateWithoutProfileImageInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DatingProfileCreateOrConnectWithoutProfileImageInputSchema).optional(),
  upsert: z.lazy(() => DatingProfileUpsertWithoutProfileImageInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => DatingProfileWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => DatingProfileWhereInputSchema) ]).optional(),
  connect: z.lazy(() => DatingProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DatingProfileUpdateToOneWithWhereWithoutProfileImageInputSchema),z.lazy(() => DatingProfileUpdateWithoutProfileImageInputSchema),z.lazy(() => DatingProfileUncheckedUpdateWithoutProfileImageInputSchema) ]).optional(),
}).strict();

export const DatingProfileUncheckedUpdateManyWithoutOtherImagesNestedInputSchema: z.ZodType<Prisma.DatingProfileUncheckedUpdateManyWithoutOtherImagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => DatingProfileCreateWithoutOtherImagesInputSchema),z.lazy(() => DatingProfileCreateWithoutOtherImagesInputSchema).array(),z.lazy(() => DatingProfileUncheckedCreateWithoutOtherImagesInputSchema),z.lazy(() => DatingProfileUncheckedCreateWithoutOtherImagesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DatingProfileCreateOrConnectWithoutOtherImagesInputSchema),z.lazy(() => DatingProfileCreateOrConnectWithoutOtherImagesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DatingProfileUpsertWithWhereUniqueWithoutOtherImagesInputSchema),z.lazy(() => DatingProfileUpsertWithWhereUniqueWithoutOtherImagesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => DatingProfileWhereUniqueInputSchema),z.lazy(() => DatingProfileWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DatingProfileWhereUniqueInputSchema),z.lazy(() => DatingProfileWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DatingProfileWhereUniqueInputSchema),z.lazy(() => DatingProfileWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DatingProfileWhereUniqueInputSchema),z.lazy(() => DatingProfileWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DatingProfileUpdateWithWhereUniqueWithoutOtherImagesInputSchema),z.lazy(() => DatingProfileUpdateWithWhereUniqueWithoutOtherImagesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DatingProfileUpdateManyWithWhereWithoutOtherImagesInputSchema),z.lazy(() => DatingProfileUpdateManyWithWhereWithoutOtherImagesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DatingProfileScalarWhereInputSchema),z.lazy(() => DatingProfileScalarWhereInputSchema).array() ]).optional(),
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

export const NestedEnumConnectionTypeFilterSchema: z.ZodType<Prisma.NestedEnumConnectionTypeFilter> = z.object({
  equals: z.lazy(() => ConnectionTypeSchema).optional(),
  in: z.lazy(() => ConnectionTypeSchema).array().optional(),
  notIn: z.lazy(() => ConnectionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ConnectionTypeSchema),z.lazy(() => NestedEnumConnectionTypeFilterSchema) ]).optional(),
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

export const NestedEnumConnectionTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumConnectionTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ConnectionTypeSchema).optional(),
  in: z.lazy(() => ConnectionTypeSchema).array().optional(),
  notIn: z.lazy(() => ConnectionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ConnectionTypeSchema),z.lazy(() => NestedEnumConnectionTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumConnectionTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumConnectionTypeFilterSchema).optional()
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

export const NestedEnumPreferenceGenderFilterSchema: z.ZodType<Prisma.NestedEnumPreferenceGenderFilter> = z.object({
  equals: z.lazy(() => PreferenceGenderSchema).optional(),
  in: z.lazy(() => PreferenceGenderSchema).array().optional(),
  notIn: z.lazy(() => PreferenceGenderSchema).array().optional(),
  not: z.union([ z.lazy(() => PreferenceGenderSchema),z.lazy(() => NestedEnumPreferenceGenderFilterSchema) ]).optional(),
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

export const NestedEnumPreferenceGenderWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumPreferenceGenderWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PreferenceGenderSchema).optional(),
  in: z.lazy(() => PreferenceGenderSchema).array().optional(),
  notIn: z.lazy(() => PreferenceGenderSchema).array().optional(),
  not: z.union([ z.lazy(() => PreferenceGenderSchema),z.lazy(() => NestedEnumPreferenceGenderWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPreferenceGenderFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPreferenceGenderFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
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

export const NestedEnumConnectionStatusFilterSchema: z.ZodType<Prisma.NestedEnumConnectionStatusFilter> = z.object({
  equals: z.lazy(() => ConnectionStatusSchema).optional(),
  in: z.lazy(() => ConnectionStatusSchema).array().optional(),
  notIn: z.lazy(() => ConnectionStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ConnectionStatusSchema),z.lazy(() => NestedEnumConnectionStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumConnectionStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumConnectionStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ConnectionStatusSchema).optional(),
  in: z.lazy(() => ConnectionStatusSchema).array().optional(),
  notIn: z.lazy(() => ConnectionStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ConnectionStatusSchema),z.lazy(() => NestedEnumConnectionStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumConnectionStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumConnectionStatusFilterSchema).optional()
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

export const DatingProfileTagCreateWithoutTagInputSchema: z.ZodType<Prisma.DatingProfileTagCreateWithoutTagInput> = z.object({
  id: z.string().cuid().optional(),
  datingProfile: z.lazy(() => DatingProfileCreateNestedOneWithoutTagsInputSchema)
}).strict();

export const DatingProfileTagUncheckedCreateWithoutTagInputSchema: z.ZodType<Prisma.DatingProfileTagUncheckedCreateWithoutTagInput> = z.object({
  id: z.string().cuid().optional(),
  datingProfileId: z.string()
}).strict();

export const DatingProfileTagCreateOrConnectWithoutTagInputSchema: z.ZodType<Prisma.DatingProfileTagCreateOrConnectWithoutTagInput> = z.object({
  where: z.lazy(() => DatingProfileTagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DatingProfileTagCreateWithoutTagInputSchema),z.lazy(() => DatingProfileTagUncheckedCreateWithoutTagInputSchema) ]),
}).strict();

export const DatingProfileTagCreateManyTagInputEnvelopeSchema: z.ZodType<Prisma.DatingProfileTagCreateManyTagInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => DatingProfileTagCreateManyTagInputSchema),z.lazy(() => DatingProfileTagCreateManyTagInputSchema).array() ]),
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

export const ProfileTagScalarWhereInputSchema: z.ZodType<Prisma.ProfileTagScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProfileTagScalarWhereInputSchema),z.lazy(() => ProfileTagScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfileTagScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfileTagScalarWhereInputSchema),z.lazy(() => ProfileTagScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tagId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  profileId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const DatingProfileTagUpsertWithWhereUniqueWithoutTagInputSchema: z.ZodType<Prisma.DatingProfileTagUpsertWithWhereUniqueWithoutTagInput> = z.object({
  where: z.lazy(() => DatingProfileTagWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DatingProfileTagUpdateWithoutTagInputSchema),z.lazy(() => DatingProfileTagUncheckedUpdateWithoutTagInputSchema) ]),
  create: z.union([ z.lazy(() => DatingProfileTagCreateWithoutTagInputSchema),z.lazy(() => DatingProfileTagUncheckedCreateWithoutTagInputSchema) ]),
}).strict();

export const DatingProfileTagUpdateWithWhereUniqueWithoutTagInputSchema: z.ZodType<Prisma.DatingProfileTagUpdateWithWhereUniqueWithoutTagInput> = z.object({
  where: z.lazy(() => DatingProfileTagWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DatingProfileTagUpdateWithoutTagInputSchema),z.lazy(() => DatingProfileTagUncheckedUpdateWithoutTagInputSchema) ]),
}).strict();

export const DatingProfileTagUpdateManyWithWhereWithoutTagInputSchema: z.ZodType<Prisma.DatingProfileTagUpdateManyWithWhereWithoutTagInput> = z.object({
  where: z.lazy(() => DatingProfileTagScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DatingProfileTagUpdateManyMutationInputSchema),z.lazy(() => DatingProfileTagUncheckedUpdateManyWithoutTagInputSchema) ]),
}).strict();

export const DatingProfileTagScalarWhereInputSchema: z.ZodType<Prisma.DatingProfileTagScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DatingProfileTagScalarWhereInputSchema),z.lazy(() => DatingProfileTagScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DatingProfileTagScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DatingProfileTagScalarWhereInputSchema),z.lazy(() => DatingProfileTagScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tagId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  datingProfileId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const TagCreateWithoutProfileTagsInputSchema: z.ZodType<Prisma.TagCreateWithoutProfileTagsInput> = z.object({
  name: z.string(),
  scope: z.lazy(() => ConnectionTypeSchema),
  createdAt: z.coerce.date().optional(),
  datingProfileTag: z.lazy(() => DatingProfileTagCreateNestedManyWithoutTagInputSchema).optional()
}).strict();

export const TagUncheckedCreateWithoutProfileTagsInputSchema: z.ZodType<Prisma.TagUncheckedCreateWithoutProfileTagsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  scope: z.lazy(() => ConnectionTypeSchema),
  createdAt: z.coerce.date().optional(),
  datingProfileTag: z.lazy(() => DatingProfileTagUncheckedCreateNestedManyWithoutTagInputSchema).optional()
}).strict();

export const TagCreateOrConnectWithoutProfileTagsInputSchema: z.ZodType<Prisma.TagCreateOrConnectWithoutProfileTagsInput> = z.object({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TagCreateWithoutProfileTagsInputSchema),z.lazy(() => TagUncheckedCreateWithoutProfileTagsInputSchema) ]),
}).strict();

export const ProfileCreateWithoutTagsInputSchema: z.ZodType<Prisma.ProfileCreateWithoutTagsInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  intro: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutProfileInputSchema),
  profileImage: z.lazy(() => ProfileImageCreateNestedOneWithoutPrimaryForProfileInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageCreateNestedManyWithoutOtherForProfilesInputSchema).optional()
}).strict();

export const ProfileUncheckedCreateWithoutTagsInputSchema: z.ZodType<Prisma.ProfileUncheckedCreateWithoutTagsInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  intro: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  userId: z.string(),
  profileImageId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  otherImages: z.lazy(() => ProfileImageUncheckedCreateNestedManyWithoutOtherForProfilesInputSchema).optional()
}).strict();

export const ProfileCreateOrConnectWithoutTagsInputSchema: z.ZodType<Prisma.ProfileCreateOrConnectWithoutTagsInput> = z.object({
  where: z.lazy(() => ProfileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProfileCreateWithoutTagsInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutTagsInputSchema) ]),
}).strict();

export const TagUpsertWithoutProfileTagsInputSchema: z.ZodType<Prisma.TagUpsertWithoutProfileTagsInput> = z.object({
  update: z.union([ z.lazy(() => TagUpdateWithoutProfileTagsInputSchema),z.lazy(() => TagUncheckedUpdateWithoutProfileTagsInputSchema) ]),
  create: z.union([ z.lazy(() => TagCreateWithoutProfileTagsInputSchema),z.lazy(() => TagUncheckedCreateWithoutProfileTagsInputSchema) ]),
  where: z.lazy(() => TagWhereInputSchema).optional()
}).strict();

export const TagUpdateToOneWithWhereWithoutProfileTagsInputSchema: z.ZodType<Prisma.TagUpdateToOneWithWhereWithoutProfileTagsInput> = z.object({
  where: z.lazy(() => TagWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TagUpdateWithoutProfileTagsInputSchema),z.lazy(() => TagUncheckedUpdateWithoutProfileTagsInputSchema) ]),
}).strict();

export const TagUpdateWithoutProfileTagsInputSchema: z.ZodType<Prisma.TagUpdateWithoutProfileTagsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => ConnectionTypeSchema),z.lazy(() => EnumConnectionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  datingProfileTag: z.lazy(() => DatingProfileTagUpdateManyWithoutTagNestedInputSchema).optional()
}).strict();

export const TagUncheckedUpdateWithoutProfileTagsInputSchema: z.ZodType<Prisma.TagUncheckedUpdateWithoutProfileTagsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => ConnectionTypeSchema),z.lazy(() => EnumConnectionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  datingProfileTag: z.lazy(() => DatingProfileTagUncheckedUpdateManyWithoutTagNestedInputSchema).optional()
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
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutProfileNestedInputSchema).optional(),
  profileImage: z.lazy(() => ProfileImageUpdateOneWithoutPrimaryForProfileNestedInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageUpdateManyWithoutOtherForProfilesNestedInputSchema).optional()
}).strict();

export const ProfileUncheckedUpdateWithoutTagsInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateWithoutTagsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  intro: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  otherImages: z.lazy(() => ProfileImageUncheckedUpdateManyWithoutOtherForProfilesNestedInputSchema).optional()
}).strict();

export const TagCreateWithoutDatingProfileTagInputSchema: z.ZodType<Prisma.TagCreateWithoutDatingProfileTagInput> = z.object({
  name: z.string(),
  scope: z.lazy(() => ConnectionTypeSchema),
  createdAt: z.coerce.date().optional(),
  profileTags: z.lazy(() => ProfileTagCreateNestedManyWithoutTagInputSchema).optional()
}).strict();

export const TagUncheckedCreateWithoutDatingProfileTagInputSchema: z.ZodType<Prisma.TagUncheckedCreateWithoutDatingProfileTagInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  scope: z.lazy(() => ConnectionTypeSchema),
  createdAt: z.coerce.date().optional(),
  profileTags: z.lazy(() => ProfileTagUncheckedCreateNestedManyWithoutTagInputSchema).optional()
}).strict();

export const TagCreateOrConnectWithoutDatingProfileTagInputSchema: z.ZodType<Prisma.TagCreateOrConnectWithoutDatingProfileTagInput> = z.object({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TagCreateWithoutDatingProfileTagInputSchema),z.lazy(() => TagUncheckedCreateWithoutDatingProfileTagInputSchema) ]),
}).strict();

export const DatingProfileCreateWithoutTagsInputSchema: z.ZodType<Prisma.DatingProfileCreateWithoutTagsInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  intro: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  birthday: z.coerce.date().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional(),
  relationship: z.lazy(() => RelationshipStatusSchema).optional(),
  hasKids: z.boolean().optional().nullable(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutDatingProfileInputSchema),
  datingPreference: z.lazy(() => DatingPreferenceCreateNestedOneWithoutProfileInputSchema).optional(),
  profileImage: z.lazy(() => ProfileImageCreateNestedOneWithoutPrimaryForDatingProfileInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageCreateNestedManyWithoutOtherForDatingProfilesInputSchema).optional()
}).strict();

export const DatingProfileUncheckedCreateWithoutTagsInputSchema: z.ZodType<Prisma.DatingProfileUncheckedCreateWithoutTagsInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  intro: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  birthday: z.coerce.date().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional(),
  relationship: z.lazy(() => RelationshipStatusSchema).optional(),
  hasKids: z.boolean().optional().nullable(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  profileImageId: z.string().optional().nullable(),
  datingPreference: z.lazy(() => DatingPreferenceUncheckedCreateNestedOneWithoutProfileInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageUncheckedCreateNestedManyWithoutOtherForDatingProfilesInputSchema).optional()
}).strict();

export const DatingProfileCreateOrConnectWithoutTagsInputSchema: z.ZodType<Prisma.DatingProfileCreateOrConnectWithoutTagsInput> = z.object({
  where: z.lazy(() => DatingProfileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DatingProfileCreateWithoutTagsInputSchema),z.lazy(() => DatingProfileUncheckedCreateWithoutTagsInputSchema) ]),
}).strict();

export const TagUpsertWithoutDatingProfileTagInputSchema: z.ZodType<Prisma.TagUpsertWithoutDatingProfileTagInput> = z.object({
  update: z.union([ z.lazy(() => TagUpdateWithoutDatingProfileTagInputSchema),z.lazy(() => TagUncheckedUpdateWithoutDatingProfileTagInputSchema) ]),
  create: z.union([ z.lazy(() => TagCreateWithoutDatingProfileTagInputSchema),z.lazy(() => TagUncheckedCreateWithoutDatingProfileTagInputSchema) ]),
  where: z.lazy(() => TagWhereInputSchema).optional()
}).strict();

export const TagUpdateToOneWithWhereWithoutDatingProfileTagInputSchema: z.ZodType<Prisma.TagUpdateToOneWithWhereWithoutDatingProfileTagInput> = z.object({
  where: z.lazy(() => TagWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TagUpdateWithoutDatingProfileTagInputSchema),z.lazy(() => TagUncheckedUpdateWithoutDatingProfileTagInputSchema) ]),
}).strict();

export const TagUpdateWithoutDatingProfileTagInputSchema: z.ZodType<Prisma.TagUpdateWithoutDatingProfileTagInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => ConnectionTypeSchema),z.lazy(() => EnumConnectionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  profileTags: z.lazy(() => ProfileTagUpdateManyWithoutTagNestedInputSchema).optional()
}).strict();

export const TagUncheckedUpdateWithoutDatingProfileTagInputSchema: z.ZodType<Prisma.TagUncheckedUpdateWithoutDatingProfileTagInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => ConnectionTypeSchema),z.lazy(() => EnumConnectionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  profileTags: z.lazy(() => ProfileTagUncheckedUpdateManyWithoutTagNestedInputSchema).optional()
}).strict();

export const DatingProfileUpsertWithoutTagsInputSchema: z.ZodType<Prisma.DatingProfileUpsertWithoutTagsInput> = z.object({
  update: z.union([ z.lazy(() => DatingProfileUpdateWithoutTagsInputSchema),z.lazy(() => DatingProfileUncheckedUpdateWithoutTagsInputSchema) ]),
  create: z.union([ z.lazy(() => DatingProfileCreateWithoutTagsInputSchema),z.lazy(() => DatingProfileUncheckedCreateWithoutTagsInputSchema) ]),
  where: z.lazy(() => DatingProfileWhereInputSchema).optional()
}).strict();

export const DatingProfileUpdateToOneWithWhereWithoutTagsInputSchema: z.ZodType<Prisma.DatingProfileUpdateToOneWithWhereWithoutTagsInput> = z.object({
  where: z.lazy(() => DatingProfileWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => DatingProfileUpdateWithoutTagsInputSchema),z.lazy(() => DatingProfileUncheckedUpdateWithoutTagsInputSchema) ]),
}).strict();

export const DatingProfileUpdateWithoutTagsInputSchema: z.ZodType<Prisma.DatingProfileUpdateWithoutTagsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  intro: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  relationship: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => EnumRelationshipStatusFieldUpdateOperationsInputSchema) ]).optional(),
  hasKids: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutDatingProfileNestedInputSchema).optional(),
  datingPreference: z.lazy(() => DatingPreferenceUpdateOneWithoutProfileNestedInputSchema).optional(),
  profileImage: z.lazy(() => ProfileImageUpdateOneWithoutPrimaryForDatingProfileNestedInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageUpdateManyWithoutOtherForDatingProfilesNestedInputSchema).optional()
}).strict();

export const DatingProfileUncheckedUpdateWithoutTagsInputSchema: z.ZodType<Prisma.DatingProfileUncheckedUpdateWithoutTagsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  intro: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  relationship: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => EnumRelationshipStatusFieldUpdateOperationsInputSchema) ]).optional(),
  hasKids: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  datingPreference: z.lazy(() => DatingPreferenceUncheckedUpdateOneWithoutProfileNestedInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageUncheckedUpdateManyWithoutOtherForDatingProfilesNestedInputSchema).optional()
}).strict();

export const DatingProfileCreateWithoutDatingPreferenceInputSchema: z.ZodType<Prisma.DatingProfileCreateWithoutDatingPreferenceInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  intro: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  birthday: z.coerce.date().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional(),
  relationship: z.lazy(() => RelationshipStatusSchema).optional(),
  hasKids: z.boolean().optional().nullable(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutDatingProfileInputSchema),
  tags: z.lazy(() => DatingProfileTagCreateNestedManyWithoutDatingProfileInputSchema).optional(),
  profileImage: z.lazy(() => ProfileImageCreateNestedOneWithoutPrimaryForDatingProfileInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageCreateNestedManyWithoutOtherForDatingProfilesInputSchema).optional()
}).strict();

export const DatingProfileUncheckedCreateWithoutDatingPreferenceInputSchema: z.ZodType<Prisma.DatingProfileUncheckedCreateWithoutDatingPreferenceInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  intro: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  birthday: z.coerce.date().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional(),
  relationship: z.lazy(() => RelationshipStatusSchema).optional(),
  hasKids: z.boolean().optional().nullable(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  profileImageId: z.string().optional().nullable(),
  tags: z.lazy(() => DatingProfileTagUncheckedCreateNestedManyWithoutDatingProfileInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageUncheckedCreateNestedManyWithoutOtherForDatingProfilesInputSchema).optional()
}).strict();

export const DatingProfileCreateOrConnectWithoutDatingPreferenceInputSchema: z.ZodType<Prisma.DatingProfileCreateOrConnectWithoutDatingPreferenceInput> = z.object({
  where: z.lazy(() => DatingProfileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DatingProfileCreateWithoutDatingPreferenceInputSchema),z.lazy(() => DatingProfileUncheckedCreateWithoutDatingPreferenceInputSchema) ]),
}).strict();

export const DatingProfileUpsertWithoutDatingPreferenceInputSchema: z.ZodType<Prisma.DatingProfileUpsertWithoutDatingPreferenceInput> = z.object({
  update: z.union([ z.lazy(() => DatingProfileUpdateWithoutDatingPreferenceInputSchema),z.lazy(() => DatingProfileUncheckedUpdateWithoutDatingPreferenceInputSchema) ]),
  create: z.union([ z.lazy(() => DatingProfileCreateWithoutDatingPreferenceInputSchema),z.lazy(() => DatingProfileUncheckedCreateWithoutDatingPreferenceInputSchema) ]),
  where: z.lazy(() => DatingProfileWhereInputSchema).optional()
}).strict();

export const DatingProfileUpdateToOneWithWhereWithoutDatingPreferenceInputSchema: z.ZodType<Prisma.DatingProfileUpdateToOneWithWhereWithoutDatingPreferenceInput> = z.object({
  where: z.lazy(() => DatingProfileWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => DatingProfileUpdateWithoutDatingPreferenceInputSchema),z.lazy(() => DatingProfileUncheckedUpdateWithoutDatingPreferenceInputSchema) ]),
}).strict();

export const DatingProfileUpdateWithoutDatingPreferenceInputSchema: z.ZodType<Prisma.DatingProfileUpdateWithoutDatingPreferenceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  intro: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  relationship: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => EnumRelationshipStatusFieldUpdateOperationsInputSchema) ]).optional(),
  hasKids: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutDatingProfileNestedInputSchema).optional(),
  tags: z.lazy(() => DatingProfileTagUpdateManyWithoutDatingProfileNestedInputSchema).optional(),
  profileImage: z.lazy(() => ProfileImageUpdateOneWithoutPrimaryForDatingProfileNestedInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageUpdateManyWithoutOtherForDatingProfilesNestedInputSchema).optional()
}).strict();

export const DatingProfileUncheckedUpdateWithoutDatingPreferenceInputSchema: z.ZodType<Prisma.DatingProfileUncheckedUpdateWithoutDatingPreferenceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  intro: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  relationship: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => EnumRelationshipStatusFieldUpdateOperationsInputSchema) ]).optional(),
  hasKids: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tags: z.lazy(() => DatingProfileTagUncheckedUpdateManyWithoutDatingProfileNestedInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageUncheckedUpdateManyWithoutOtherForDatingProfilesNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutRequestsSentInputSchema: z.ZodType<Prisma.UserCreateWithoutRequestsSentInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  tokenVersion: z.number().int().optional(),
  loginToken: z.string().optional().nullable(),
  loginTokenExp: z.coerce.date().optional().nullable(),
  isActive: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  isRegistrationConfirmed: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lastLoginAt: z.coerce.date().optional().nullable(),
  language: z.string().optional().nullable(),
  lookingFor: z.union([ z.lazy(() => UserCreatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutUserInputSchema).optional(),
  datingProfile: z.lazy(() => DatingProfileCreateNestedOneWithoutUserInputSchema).optional(),
  ProfileImage: z.lazy(() => ProfileImageCreateNestedManyWithoutUserInputSchema).optional(),
  requestsReceived: z.lazy(() => ConnectionRequestCreateNestedManyWithoutToUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutRequestsSentInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRequestsSentInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  tokenVersion: z.number().int().optional(),
  loginToken: z.string().optional().nullable(),
  loginTokenExp: z.coerce.date().optional().nullable(),
  isActive: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  isRegistrationConfirmed: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lastLoginAt: z.coerce.date().optional().nullable(),
  language: z.string().optional().nullable(),
  lookingFor: z.union([ z.lazy(() => UserCreatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  profile: z.lazy(() => ProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  datingProfile: z.lazy(() => DatingProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  ProfileImage: z.lazy(() => ProfileImageUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  requestsReceived: z.lazy(() => ConnectionRequestUncheckedCreateNestedManyWithoutToUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutRequestsSentInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRequestsSentInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutRequestsSentInputSchema),z.lazy(() => UserUncheckedCreateWithoutRequestsSentInputSchema) ]),
}).strict();

export const UserCreateWithoutRequestsReceivedInputSchema: z.ZodType<Prisma.UserCreateWithoutRequestsReceivedInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  tokenVersion: z.number().int().optional(),
  loginToken: z.string().optional().nullable(),
  loginTokenExp: z.coerce.date().optional().nullable(),
  isActive: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  isRegistrationConfirmed: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lastLoginAt: z.coerce.date().optional().nullable(),
  language: z.string().optional().nullable(),
  lookingFor: z.union([ z.lazy(() => UserCreatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutUserInputSchema).optional(),
  datingProfile: z.lazy(() => DatingProfileCreateNestedOneWithoutUserInputSchema).optional(),
  ProfileImage: z.lazy(() => ProfileImageCreateNestedManyWithoutUserInputSchema).optional(),
  requestsSent: z.lazy(() => ConnectionRequestCreateNestedManyWithoutFromUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutRequestsReceivedInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRequestsReceivedInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  tokenVersion: z.number().int().optional(),
  loginToken: z.string().optional().nullable(),
  loginTokenExp: z.coerce.date().optional().nullable(),
  isActive: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  isRegistrationConfirmed: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lastLoginAt: z.coerce.date().optional().nullable(),
  language: z.string().optional().nullable(),
  lookingFor: z.union([ z.lazy(() => UserCreatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  profile: z.lazy(() => ProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  datingProfile: z.lazy(() => DatingProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  ProfileImage: z.lazy(() => ProfileImageUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  requestsSent: z.lazy(() => ConnectionRequestUncheckedCreateNestedManyWithoutFromUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutRequestsReceivedInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRequestsReceivedInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutRequestsReceivedInputSchema),z.lazy(() => UserUncheckedCreateWithoutRequestsReceivedInputSchema) ]),
}).strict();

export const UserUpsertWithoutRequestsSentInputSchema: z.ZodType<Prisma.UserUpsertWithoutRequestsSentInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutRequestsSentInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRequestsSentInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutRequestsSentInputSchema),z.lazy(() => UserUncheckedCreateWithoutRequestsSentInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutRequestsSentInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutRequestsSentInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutRequestsSentInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRequestsSentInputSchema) ]),
}).strict();

export const UserUpdateWithoutRequestsSentInputSchema: z.ZodType<Prisma.UserUpdateWithoutRequestsSentInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tokenVersion: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  loginToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  loginTokenExp: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isRegistrationConfirmed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastLoginAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  language: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lookingFor: z.union([ z.lazy(() => UserUpdatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profile: z.lazy(() => ProfileUpdateOneWithoutUserNestedInputSchema).optional(),
  datingProfile: z.lazy(() => DatingProfileUpdateOneWithoutUserNestedInputSchema).optional(),
  ProfileImage: z.lazy(() => ProfileImageUpdateManyWithoutUserNestedInputSchema).optional(),
  requestsReceived: z.lazy(() => ConnectionRequestUpdateManyWithoutToUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutRequestsSentInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutRequestsSentInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tokenVersion: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  loginToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  loginTokenExp: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isRegistrationConfirmed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastLoginAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  language: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lookingFor: z.union([ z.lazy(() => UserUpdatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profile: z.lazy(() => ProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  datingProfile: z.lazy(() => DatingProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  ProfileImage: z.lazy(() => ProfileImageUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  requestsReceived: z.lazy(() => ConnectionRequestUncheckedUpdateManyWithoutToUserNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutRequestsReceivedInputSchema: z.ZodType<Prisma.UserUpsertWithoutRequestsReceivedInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutRequestsReceivedInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRequestsReceivedInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutRequestsReceivedInputSchema),z.lazy(() => UserUncheckedCreateWithoutRequestsReceivedInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutRequestsReceivedInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutRequestsReceivedInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutRequestsReceivedInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRequestsReceivedInputSchema) ]),
}).strict();

export const UserUpdateWithoutRequestsReceivedInputSchema: z.ZodType<Prisma.UserUpdateWithoutRequestsReceivedInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tokenVersion: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  loginToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  loginTokenExp: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isRegistrationConfirmed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastLoginAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  language: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lookingFor: z.union([ z.lazy(() => UserUpdatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profile: z.lazy(() => ProfileUpdateOneWithoutUserNestedInputSchema).optional(),
  datingProfile: z.lazy(() => DatingProfileUpdateOneWithoutUserNestedInputSchema).optional(),
  ProfileImage: z.lazy(() => ProfileImageUpdateManyWithoutUserNestedInputSchema).optional(),
  requestsSent: z.lazy(() => ConnectionRequestUpdateManyWithoutFromUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutRequestsReceivedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutRequestsReceivedInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tokenVersion: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  loginToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  loginTokenExp: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isRegistrationConfirmed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastLoginAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  language: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lookingFor: z.union([ z.lazy(() => UserUpdatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profile: z.lazy(() => ProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  datingProfile: z.lazy(() => DatingProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  ProfileImage: z.lazy(() => ProfileImageUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  requestsSent: z.lazy(() => ConnectionRequestUncheckedUpdateManyWithoutFromUserNestedInputSchema).optional()
}).strict();

export const ProfileCreateWithoutUserInputSchema: z.ZodType<Prisma.ProfileCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  intro: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tags: z.lazy(() => ProfileTagCreateNestedManyWithoutProfileInputSchema).optional(),
  profileImage: z.lazy(() => ProfileImageCreateNestedOneWithoutPrimaryForProfileInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageCreateNestedManyWithoutOtherForProfilesInputSchema).optional()
}).strict();

export const ProfileUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ProfileUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  intro: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  profileImageId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tags: z.lazy(() => ProfileTagUncheckedCreateNestedManyWithoutProfileInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageUncheckedCreateNestedManyWithoutOtherForProfilesInputSchema).optional()
}).strict();

export const ProfileCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ProfileCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ProfileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProfileCreateWithoutUserInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const DatingProfileCreateWithoutUserInputSchema: z.ZodType<Prisma.DatingProfileCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  intro: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  birthday: z.coerce.date().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional(),
  relationship: z.lazy(() => RelationshipStatusSchema).optional(),
  hasKids: z.boolean().optional().nullable(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  datingPreference: z.lazy(() => DatingPreferenceCreateNestedOneWithoutProfileInputSchema).optional(),
  tags: z.lazy(() => DatingProfileTagCreateNestedManyWithoutDatingProfileInputSchema).optional(),
  profileImage: z.lazy(() => ProfileImageCreateNestedOneWithoutPrimaryForDatingProfileInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageCreateNestedManyWithoutOtherForDatingProfilesInputSchema).optional()
}).strict();

export const DatingProfileUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.DatingProfileUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  intro: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  birthday: z.coerce.date().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional(),
  relationship: z.lazy(() => RelationshipStatusSchema).optional(),
  hasKids: z.boolean().optional().nullable(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  profileImageId: z.string().optional().nullable(),
  datingPreference: z.lazy(() => DatingPreferenceUncheckedCreateNestedOneWithoutProfileInputSchema).optional(),
  tags: z.lazy(() => DatingProfileTagUncheckedCreateNestedManyWithoutDatingProfileInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageUncheckedCreateNestedManyWithoutOtherForDatingProfilesInputSchema).optional()
}).strict();

export const DatingProfileCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.DatingProfileCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => DatingProfileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DatingProfileCreateWithoutUserInputSchema),z.lazy(() => DatingProfileUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ProfileImageCreateWithoutUserInputSchema: z.ZodType<Prisma.ProfileImageCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  mimeType: z.string(),
  altText: z.string().optional().nullable(),
  storagePath: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  primaryForProfile: z.lazy(() => ProfileCreateNestedOneWithoutProfileImageInputSchema).optional(),
  otherForProfiles: z.lazy(() => ProfileCreateNestedManyWithoutOtherImagesInputSchema).optional(),
  primaryForDatingProfile: z.lazy(() => DatingProfileCreateNestedOneWithoutProfileImageInputSchema).optional(),
  otherForDatingProfiles: z.lazy(() => DatingProfileCreateNestedManyWithoutOtherImagesInputSchema).optional()
}).strict();

export const ProfileImageUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ProfileImageUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  mimeType: z.string(),
  altText: z.string().optional().nullable(),
  storagePath: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  primaryForProfile: z.lazy(() => ProfileUncheckedCreateNestedOneWithoutProfileImageInputSchema).optional(),
  otherForProfiles: z.lazy(() => ProfileUncheckedCreateNestedManyWithoutOtherImagesInputSchema).optional(),
  primaryForDatingProfile: z.lazy(() => DatingProfileUncheckedCreateNestedOneWithoutProfileImageInputSchema).optional(),
  otherForDatingProfiles: z.lazy(() => DatingProfileUncheckedCreateNestedManyWithoutOtherImagesInputSchema).optional()
}).strict();

export const ProfileImageCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ProfileImageCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ProfileImageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProfileImageCreateWithoutUserInputSchema),z.lazy(() => ProfileImageUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ProfileImageCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ProfileImageCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ProfileImageCreateManyUserInputSchema),z.lazy(() => ProfileImageCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ConnectionRequestCreateWithoutFromUserInputSchema: z.ZodType<Prisma.ConnectionRequestCreateWithoutFromUserInput> = z.object({
  id: z.string().cuid().optional(),
  scope: z.lazy(() => ConnectionTypeSchema),
  status: z.lazy(() => ConnectionStatusSchema),
  createdAt: z.coerce.date().optional(),
  toUser: z.lazy(() => UserCreateNestedOneWithoutRequestsReceivedInputSchema)
}).strict();

export const ConnectionRequestUncheckedCreateWithoutFromUserInputSchema: z.ZodType<Prisma.ConnectionRequestUncheckedCreateWithoutFromUserInput> = z.object({
  id: z.string().cuid().optional(),
  toUserId: z.string(),
  scope: z.lazy(() => ConnectionTypeSchema),
  status: z.lazy(() => ConnectionStatusSchema),
  createdAt: z.coerce.date().optional()
}).strict();

export const ConnectionRequestCreateOrConnectWithoutFromUserInputSchema: z.ZodType<Prisma.ConnectionRequestCreateOrConnectWithoutFromUserInput> = z.object({
  where: z.lazy(() => ConnectionRequestWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ConnectionRequestCreateWithoutFromUserInputSchema),z.lazy(() => ConnectionRequestUncheckedCreateWithoutFromUserInputSchema) ]),
}).strict();

export const ConnectionRequestCreateManyFromUserInputEnvelopeSchema: z.ZodType<Prisma.ConnectionRequestCreateManyFromUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ConnectionRequestCreateManyFromUserInputSchema),z.lazy(() => ConnectionRequestCreateManyFromUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ConnectionRequestCreateWithoutToUserInputSchema: z.ZodType<Prisma.ConnectionRequestCreateWithoutToUserInput> = z.object({
  id: z.string().cuid().optional(),
  scope: z.lazy(() => ConnectionTypeSchema),
  status: z.lazy(() => ConnectionStatusSchema),
  createdAt: z.coerce.date().optional(),
  fromUser: z.lazy(() => UserCreateNestedOneWithoutRequestsSentInputSchema)
}).strict();

export const ConnectionRequestUncheckedCreateWithoutToUserInputSchema: z.ZodType<Prisma.ConnectionRequestUncheckedCreateWithoutToUserInput> = z.object({
  id: z.string().cuid().optional(),
  fromUserId: z.string(),
  scope: z.lazy(() => ConnectionTypeSchema),
  status: z.lazy(() => ConnectionStatusSchema),
  createdAt: z.coerce.date().optional()
}).strict();

export const ConnectionRequestCreateOrConnectWithoutToUserInputSchema: z.ZodType<Prisma.ConnectionRequestCreateOrConnectWithoutToUserInput> = z.object({
  where: z.lazy(() => ConnectionRequestWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ConnectionRequestCreateWithoutToUserInputSchema),z.lazy(() => ConnectionRequestUncheckedCreateWithoutToUserInputSchema) ]),
}).strict();

export const ConnectionRequestCreateManyToUserInputEnvelopeSchema: z.ZodType<Prisma.ConnectionRequestCreateManyToUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ConnectionRequestCreateManyToUserInputSchema),z.lazy(() => ConnectionRequestCreateManyToUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
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
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => ProfileTagUpdateManyWithoutProfileNestedInputSchema).optional(),
  profileImage: z.lazy(() => ProfileImageUpdateOneWithoutPrimaryForProfileNestedInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageUpdateManyWithoutOtherForProfilesNestedInputSchema).optional()
}).strict();

export const ProfileUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  intro: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  profileImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => ProfileTagUncheckedUpdateManyWithoutProfileNestedInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageUncheckedUpdateManyWithoutOtherForProfilesNestedInputSchema).optional()
}).strict();

export const DatingProfileUpsertWithoutUserInputSchema: z.ZodType<Prisma.DatingProfileUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => DatingProfileUpdateWithoutUserInputSchema),z.lazy(() => DatingProfileUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => DatingProfileCreateWithoutUserInputSchema),z.lazy(() => DatingProfileUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => DatingProfileWhereInputSchema).optional()
}).strict();

export const DatingProfileUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.DatingProfileUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => DatingProfileWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => DatingProfileUpdateWithoutUserInputSchema),z.lazy(() => DatingProfileUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const DatingProfileUpdateWithoutUserInputSchema: z.ZodType<Prisma.DatingProfileUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  intro: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  relationship: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => EnumRelationshipStatusFieldUpdateOperationsInputSchema) ]).optional(),
  hasKids: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  datingPreference: z.lazy(() => DatingPreferenceUpdateOneWithoutProfileNestedInputSchema).optional(),
  tags: z.lazy(() => DatingProfileTagUpdateManyWithoutDatingProfileNestedInputSchema).optional(),
  profileImage: z.lazy(() => ProfileImageUpdateOneWithoutPrimaryForDatingProfileNestedInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageUpdateManyWithoutOtherForDatingProfilesNestedInputSchema).optional()
}).strict();

export const DatingProfileUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.DatingProfileUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  intro: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  relationship: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => EnumRelationshipStatusFieldUpdateOperationsInputSchema) ]).optional(),
  hasKids: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  profileImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  datingPreference: z.lazy(() => DatingPreferenceUncheckedUpdateOneWithoutProfileNestedInputSchema).optional(),
  tags: z.lazy(() => DatingProfileTagUncheckedUpdateManyWithoutDatingProfileNestedInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageUncheckedUpdateManyWithoutOtherForDatingProfilesNestedInputSchema).optional()
}).strict();

export const ProfileImageUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ProfileImageUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ProfileImageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProfileImageUpdateWithoutUserInputSchema),z.lazy(() => ProfileImageUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ProfileImageCreateWithoutUserInputSchema),z.lazy(() => ProfileImageUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ProfileImageUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ProfileImageUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ProfileImageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProfileImageUpdateWithoutUserInputSchema),z.lazy(() => ProfileImageUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const ProfileImageUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ProfileImageUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ProfileImageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProfileImageUpdateManyMutationInputSchema),z.lazy(() => ProfileImageUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const ProfileImageScalarWhereInputSchema: z.ZodType<Prisma.ProfileImageScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProfileImageScalarWhereInputSchema),z.lazy(() => ProfileImageScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfileImageScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfileImageScalarWhereInputSchema),z.lazy(() => ProfileImageScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  mimeType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  altText: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  storagePath: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ConnectionRequestUpsertWithWhereUniqueWithoutFromUserInputSchema: z.ZodType<Prisma.ConnectionRequestUpsertWithWhereUniqueWithoutFromUserInput> = z.object({
  where: z.lazy(() => ConnectionRequestWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ConnectionRequestUpdateWithoutFromUserInputSchema),z.lazy(() => ConnectionRequestUncheckedUpdateWithoutFromUserInputSchema) ]),
  create: z.union([ z.lazy(() => ConnectionRequestCreateWithoutFromUserInputSchema),z.lazy(() => ConnectionRequestUncheckedCreateWithoutFromUserInputSchema) ]),
}).strict();

export const ConnectionRequestUpdateWithWhereUniqueWithoutFromUserInputSchema: z.ZodType<Prisma.ConnectionRequestUpdateWithWhereUniqueWithoutFromUserInput> = z.object({
  where: z.lazy(() => ConnectionRequestWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ConnectionRequestUpdateWithoutFromUserInputSchema),z.lazy(() => ConnectionRequestUncheckedUpdateWithoutFromUserInputSchema) ]),
}).strict();

export const ConnectionRequestUpdateManyWithWhereWithoutFromUserInputSchema: z.ZodType<Prisma.ConnectionRequestUpdateManyWithWhereWithoutFromUserInput> = z.object({
  where: z.lazy(() => ConnectionRequestScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ConnectionRequestUpdateManyMutationInputSchema),z.lazy(() => ConnectionRequestUncheckedUpdateManyWithoutFromUserInputSchema) ]),
}).strict();

export const ConnectionRequestScalarWhereInputSchema: z.ZodType<Prisma.ConnectionRequestScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ConnectionRequestScalarWhereInputSchema),z.lazy(() => ConnectionRequestScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ConnectionRequestScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ConnectionRequestScalarWhereInputSchema),z.lazy(() => ConnectionRequestScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fromUserId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  toUserId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  scope: z.union([ z.lazy(() => EnumConnectionTypeFilterSchema),z.lazy(() => ConnectionTypeSchema) ]).optional(),
  status: z.union([ z.lazy(() => EnumConnectionStatusFilterSchema),z.lazy(() => ConnectionStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ConnectionRequestUpsertWithWhereUniqueWithoutToUserInputSchema: z.ZodType<Prisma.ConnectionRequestUpsertWithWhereUniqueWithoutToUserInput> = z.object({
  where: z.lazy(() => ConnectionRequestWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ConnectionRequestUpdateWithoutToUserInputSchema),z.lazy(() => ConnectionRequestUncheckedUpdateWithoutToUserInputSchema) ]),
  create: z.union([ z.lazy(() => ConnectionRequestCreateWithoutToUserInputSchema),z.lazy(() => ConnectionRequestUncheckedCreateWithoutToUserInputSchema) ]),
}).strict();

export const ConnectionRequestUpdateWithWhereUniqueWithoutToUserInputSchema: z.ZodType<Prisma.ConnectionRequestUpdateWithWhereUniqueWithoutToUserInput> = z.object({
  where: z.lazy(() => ConnectionRequestWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ConnectionRequestUpdateWithoutToUserInputSchema),z.lazy(() => ConnectionRequestUncheckedUpdateWithoutToUserInputSchema) ]),
}).strict();

export const ConnectionRequestUpdateManyWithWhereWithoutToUserInputSchema: z.ZodType<Prisma.ConnectionRequestUpdateManyWithWhereWithoutToUserInput> = z.object({
  where: z.lazy(() => ConnectionRequestScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ConnectionRequestUpdateManyMutationInputSchema),z.lazy(() => ConnectionRequestUncheckedUpdateManyWithoutToUserInputSchema) ]),
}).strict();

export const UserCreateWithoutProfileInputSchema: z.ZodType<Prisma.UserCreateWithoutProfileInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  tokenVersion: z.number().int().optional(),
  loginToken: z.string().optional().nullable(),
  loginTokenExp: z.coerce.date().optional().nullable(),
  isActive: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  isRegistrationConfirmed: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lastLoginAt: z.coerce.date().optional().nullable(),
  language: z.string().optional().nullable(),
  lookingFor: z.union([ z.lazy(() => UserCreatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  datingProfile: z.lazy(() => DatingProfileCreateNestedOneWithoutUserInputSchema).optional(),
  ProfileImage: z.lazy(() => ProfileImageCreateNestedManyWithoutUserInputSchema).optional(),
  requestsSent: z.lazy(() => ConnectionRequestCreateNestedManyWithoutFromUserInputSchema).optional(),
  requestsReceived: z.lazy(() => ConnectionRequestCreateNestedManyWithoutToUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutProfileInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutProfileInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  tokenVersion: z.number().int().optional(),
  loginToken: z.string().optional().nullable(),
  loginTokenExp: z.coerce.date().optional().nullable(),
  isActive: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  isRegistrationConfirmed: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lastLoginAt: z.coerce.date().optional().nullable(),
  language: z.string().optional().nullable(),
  lookingFor: z.union([ z.lazy(() => UserCreatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  datingProfile: z.lazy(() => DatingProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  ProfileImage: z.lazy(() => ProfileImageUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  requestsSent: z.lazy(() => ConnectionRequestUncheckedCreateNestedManyWithoutFromUserInputSchema).optional(),
  requestsReceived: z.lazy(() => ConnectionRequestUncheckedCreateNestedManyWithoutToUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutProfileInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutProfileInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutProfileInputSchema),z.lazy(() => UserUncheckedCreateWithoutProfileInputSchema) ]),
}).strict();

export const ProfileTagCreateWithoutProfileInputSchema: z.ZodType<Prisma.ProfileTagCreateWithoutProfileInput> = z.object({
  id: z.string().cuid().optional(),
  tag: z.lazy(() => TagCreateNestedOneWithoutProfileTagsInputSchema)
}).strict();

export const ProfileTagUncheckedCreateWithoutProfileInputSchema: z.ZodType<Prisma.ProfileTagUncheckedCreateWithoutProfileInput> = z.object({
  id: z.string().cuid().optional(),
  tagId: z.number().int()
}).strict();

export const ProfileTagCreateOrConnectWithoutProfileInputSchema: z.ZodType<Prisma.ProfileTagCreateOrConnectWithoutProfileInput> = z.object({
  where: z.lazy(() => ProfileTagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProfileTagCreateWithoutProfileInputSchema),z.lazy(() => ProfileTagUncheckedCreateWithoutProfileInputSchema) ]),
}).strict();

export const ProfileTagCreateManyProfileInputEnvelopeSchema: z.ZodType<Prisma.ProfileTagCreateManyProfileInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ProfileTagCreateManyProfileInputSchema),z.lazy(() => ProfileTagCreateManyProfileInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ProfileImageCreateWithoutPrimaryForProfileInputSchema: z.ZodType<Prisma.ProfileImageCreateWithoutPrimaryForProfileInput> = z.object({
  id: z.string().cuid().optional(),
  mimeType: z.string(),
  altText: z.string().optional().nullable(),
  storagePath: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutProfileImageInputSchema),
  otherForProfiles: z.lazy(() => ProfileCreateNestedManyWithoutOtherImagesInputSchema).optional(),
  primaryForDatingProfile: z.lazy(() => DatingProfileCreateNestedOneWithoutProfileImageInputSchema).optional(),
  otherForDatingProfiles: z.lazy(() => DatingProfileCreateNestedManyWithoutOtherImagesInputSchema).optional()
}).strict();

export const ProfileImageUncheckedCreateWithoutPrimaryForProfileInputSchema: z.ZodType<Prisma.ProfileImageUncheckedCreateWithoutPrimaryForProfileInput> = z.object({
  id: z.string().cuid().optional(),
  mimeType: z.string(),
  userId: z.string(),
  altText: z.string().optional().nullable(),
  storagePath: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  otherForProfiles: z.lazy(() => ProfileUncheckedCreateNestedManyWithoutOtherImagesInputSchema).optional(),
  primaryForDatingProfile: z.lazy(() => DatingProfileUncheckedCreateNestedOneWithoutProfileImageInputSchema).optional(),
  otherForDatingProfiles: z.lazy(() => DatingProfileUncheckedCreateNestedManyWithoutOtherImagesInputSchema).optional()
}).strict();

export const ProfileImageCreateOrConnectWithoutPrimaryForProfileInputSchema: z.ZodType<Prisma.ProfileImageCreateOrConnectWithoutPrimaryForProfileInput> = z.object({
  where: z.lazy(() => ProfileImageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProfileImageCreateWithoutPrimaryForProfileInputSchema),z.lazy(() => ProfileImageUncheckedCreateWithoutPrimaryForProfileInputSchema) ]),
}).strict();

export const ProfileImageCreateWithoutOtherForProfilesInputSchema: z.ZodType<Prisma.ProfileImageCreateWithoutOtherForProfilesInput> = z.object({
  id: z.string().cuid().optional(),
  mimeType: z.string(),
  altText: z.string().optional().nullable(),
  storagePath: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutProfileImageInputSchema),
  primaryForProfile: z.lazy(() => ProfileCreateNestedOneWithoutProfileImageInputSchema).optional(),
  primaryForDatingProfile: z.lazy(() => DatingProfileCreateNestedOneWithoutProfileImageInputSchema).optional(),
  otherForDatingProfiles: z.lazy(() => DatingProfileCreateNestedManyWithoutOtherImagesInputSchema).optional()
}).strict();

export const ProfileImageUncheckedCreateWithoutOtherForProfilesInputSchema: z.ZodType<Prisma.ProfileImageUncheckedCreateWithoutOtherForProfilesInput> = z.object({
  id: z.string().cuid().optional(),
  mimeType: z.string(),
  userId: z.string(),
  altText: z.string().optional().nullable(),
  storagePath: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  primaryForProfile: z.lazy(() => ProfileUncheckedCreateNestedOneWithoutProfileImageInputSchema).optional(),
  primaryForDatingProfile: z.lazy(() => DatingProfileUncheckedCreateNestedOneWithoutProfileImageInputSchema).optional(),
  otherForDatingProfiles: z.lazy(() => DatingProfileUncheckedCreateNestedManyWithoutOtherImagesInputSchema).optional()
}).strict();

export const ProfileImageCreateOrConnectWithoutOtherForProfilesInputSchema: z.ZodType<Prisma.ProfileImageCreateOrConnectWithoutOtherForProfilesInput> = z.object({
  where: z.lazy(() => ProfileImageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProfileImageCreateWithoutOtherForProfilesInputSchema),z.lazy(() => ProfileImageUncheckedCreateWithoutOtherForProfilesInputSchema) ]),
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
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isRegistrationConfirmed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastLoginAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  language: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lookingFor: z.union([ z.lazy(() => UserUpdatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  datingProfile: z.lazy(() => DatingProfileUpdateOneWithoutUserNestedInputSchema).optional(),
  ProfileImage: z.lazy(() => ProfileImageUpdateManyWithoutUserNestedInputSchema).optional(),
  requestsSent: z.lazy(() => ConnectionRequestUpdateManyWithoutFromUserNestedInputSchema).optional(),
  requestsReceived: z.lazy(() => ConnectionRequestUpdateManyWithoutToUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutProfileInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutProfileInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tokenVersion: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  loginToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  loginTokenExp: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isRegistrationConfirmed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastLoginAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  language: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lookingFor: z.union([ z.lazy(() => UserUpdatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  datingProfile: z.lazy(() => DatingProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  ProfileImage: z.lazy(() => ProfileImageUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  requestsSent: z.lazy(() => ConnectionRequestUncheckedUpdateManyWithoutFromUserNestedInputSchema).optional(),
  requestsReceived: z.lazy(() => ConnectionRequestUncheckedUpdateManyWithoutToUserNestedInputSchema).optional()
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

export const ProfileImageUpsertWithoutPrimaryForProfileInputSchema: z.ZodType<Prisma.ProfileImageUpsertWithoutPrimaryForProfileInput> = z.object({
  update: z.union([ z.lazy(() => ProfileImageUpdateWithoutPrimaryForProfileInputSchema),z.lazy(() => ProfileImageUncheckedUpdateWithoutPrimaryForProfileInputSchema) ]),
  create: z.union([ z.lazy(() => ProfileImageCreateWithoutPrimaryForProfileInputSchema),z.lazy(() => ProfileImageUncheckedCreateWithoutPrimaryForProfileInputSchema) ]),
  where: z.lazy(() => ProfileImageWhereInputSchema).optional()
}).strict();

export const ProfileImageUpdateToOneWithWhereWithoutPrimaryForProfileInputSchema: z.ZodType<Prisma.ProfileImageUpdateToOneWithWhereWithoutPrimaryForProfileInput> = z.object({
  where: z.lazy(() => ProfileImageWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProfileImageUpdateWithoutPrimaryForProfileInputSchema),z.lazy(() => ProfileImageUncheckedUpdateWithoutPrimaryForProfileInputSchema) ]),
}).strict();

export const ProfileImageUpdateWithoutPrimaryForProfileInputSchema: z.ZodType<Prisma.ProfileImageUpdateWithoutPrimaryForProfileInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  altText: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  storagePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutProfileImageNestedInputSchema).optional(),
  otherForProfiles: z.lazy(() => ProfileUpdateManyWithoutOtherImagesNestedInputSchema).optional(),
  primaryForDatingProfile: z.lazy(() => DatingProfileUpdateOneWithoutProfileImageNestedInputSchema).optional(),
  otherForDatingProfiles: z.lazy(() => DatingProfileUpdateManyWithoutOtherImagesNestedInputSchema).optional()
}).strict();

export const ProfileImageUncheckedUpdateWithoutPrimaryForProfileInputSchema: z.ZodType<Prisma.ProfileImageUncheckedUpdateWithoutPrimaryForProfileInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  altText: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  storagePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  otherForProfiles: z.lazy(() => ProfileUncheckedUpdateManyWithoutOtherImagesNestedInputSchema).optional(),
  primaryForDatingProfile: z.lazy(() => DatingProfileUncheckedUpdateOneWithoutProfileImageNestedInputSchema).optional(),
  otherForDatingProfiles: z.lazy(() => DatingProfileUncheckedUpdateManyWithoutOtherImagesNestedInputSchema).optional()
}).strict();

export const ProfileImageUpsertWithWhereUniqueWithoutOtherForProfilesInputSchema: z.ZodType<Prisma.ProfileImageUpsertWithWhereUniqueWithoutOtherForProfilesInput> = z.object({
  where: z.lazy(() => ProfileImageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProfileImageUpdateWithoutOtherForProfilesInputSchema),z.lazy(() => ProfileImageUncheckedUpdateWithoutOtherForProfilesInputSchema) ]),
  create: z.union([ z.lazy(() => ProfileImageCreateWithoutOtherForProfilesInputSchema),z.lazy(() => ProfileImageUncheckedCreateWithoutOtherForProfilesInputSchema) ]),
}).strict();

export const ProfileImageUpdateWithWhereUniqueWithoutOtherForProfilesInputSchema: z.ZodType<Prisma.ProfileImageUpdateWithWhereUniqueWithoutOtherForProfilesInput> = z.object({
  where: z.lazy(() => ProfileImageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProfileImageUpdateWithoutOtherForProfilesInputSchema),z.lazy(() => ProfileImageUncheckedUpdateWithoutOtherForProfilesInputSchema) ]),
}).strict();

export const ProfileImageUpdateManyWithWhereWithoutOtherForProfilesInputSchema: z.ZodType<Prisma.ProfileImageUpdateManyWithWhereWithoutOtherForProfilesInput> = z.object({
  where: z.lazy(() => ProfileImageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProfileImageUpdateManyMutationInputSchema),z.lazy(() => ProfileImageUncheckedUpdateManyWithoutOtherForProfilesInputSchema) ]),
}).strict();

export const UserCreateWithoutDatingProfileInputSchema: z.ZodType<Prisma.UserCreateWithoutDatingProfileInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  tokenVersion: z.number().int().optional(),
  loginToken: z.string().optional().nullable(),
  loginTokenExp: z.coerce.date().optional().nullable(),
  isActive: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  isRegistrationConfirmed: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lastLoginAt: z.coerce.date().optional().nullable(),
  language: z.string().optional().nullable(),
  lookingFor: z.union([ z.lazy(() => UserCreatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutUserInputSchema).optional(),
  ProfileImage: z.lazy(() => ProfileImageCreateNestedManyWithoutUserInputSchema).optional(),
  requestsSent: z.lazy(() => ConnectionRequestCreateNestedManyWithoutFromUserInputSchema).optional(),
  requestsReceived: z.lazy(() => ConnectionRequestCreateNestedManyWithoutToUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutDatingProfileInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutDatingProfileInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  tokenVersion: z.number().int().optional(),
  loginToken: z.string().optional().nullable(),
  loginTokenExp: z.coerce.date().optional().nullable(),
  isActive: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  isRegistrationConfirmed: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lastLoginAt: z.coerce.date().optional().nullable(),
  language: z.string().optional().nullable(),
  lookingFor: z.union([ z.lazy(() => UserCreatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  profile: z.lazy(() => ProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  ProfileImage: z.lazy(() => ProfileImageUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  requestsSent: z.lazy(() => ConnectionRequestUncheckedCreateNestedManyWithoutFromUserInputSchema).optional(),
  requestsReceived: z.lazy(() => ConnectionRequestUncheckedCreateNestedManyWithoutToUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutDatingProfileInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutDatingProfileInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutDatingProfileInputSchema),z.lazy(() => UserUncheckedCreateWithoutDatingProfileInputSchema) ]),
}).strict();

export const DatingPreferenceCreateWithoutProfileInputSchema: z.ZodType<Prisma.DatingPreferenceCreateWithoutProfileInput> = z.object({
  prefGender: z.lazy(() => PreferenceGenderSchema).optional(),
  prefAgeMin: z.number().int().optional().nullable(),
  prefAgeMax: z.number().int().optional().nullable()
}).strict();

export const DatingPreferenceUncheckedCreateWithoutProfileInputSchema: z.ZodType<Prisma.DatingPreferenceUncheckedCreateWithoutProfileInput> = z.object({
  prefGender: z.lazy(() => PreferenceGenderSchema).optional(),
  prefAgeMin: z.number().int().optional().nullable(),
  prefAgeMax: z.number().int().optional().nullable()
}).strict();

export const DatingPreferenceCreateOrConnectWithoutProfileInputSchema: z.ZodType<Prisma.DatingPreferenceCreateOrConnectWithoutProfileInput> = z.object({
  where: z.lazy(() => DatingPreferenceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DatingPreferenceCreateWithoutProfileInputSchema),z.lazy(() => DatingPreferenceUncheckedCreateWithoutProfileInputSchema) ]),
}).strict();

export const DatingProfileTagCreateWithoutDatingProfileInputSchema: z.ZodType<Prisma.DatingProfileTagCreateWithoutDatingProfileInput> = z.object({
  id: z.string().cuid().optional(),
  tag: z.lazy(() => TagCreateNestedOneWithoutDatingProfileTagInputSchema)
}).strict();

export const DatingProfileTagUncheckedCreateWithoutDatingProfileInputSchema: z.ZodType<Prisma.DatingProfileTagUncheckedCreateWithoutDatingProfileInput> = z.object({
  id: z.string().cuid().optional(),
  tagId: z.number().int()
}).strict();

export const DatingProfileTagCreateOrConnectWithoutDatingProfileInputSchema: z.ZodType<Prisma.DatingProfileTagCreateOrConnectWithoutDatingProfileInput> = z.object({
  where: z.lazy(() => DatingProfileTagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DatingProfileTagCreateWithoutDatingProfileInputSchema),z.lazy(() => DatingProfileTagUncheckedCreateWithoutDatingProfileInputSchema) ]),
}).strict();

export const DatingProfileTagCreateManyDatingProfileInputEnvelopeSchema: z.ZodType<Prisma.DatingProfileTagCreateManyDatingProfileInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => DatingProfileTagCreateManyDatingProfileInputSchema),z.lazy(() => DatingProfileTagCreateManyDatingProfileInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ProfileImageCreateWithoutPrimaryForDatingProfileInputSchema: z.ZodType<Prisma.ProfileImageCreateWithoutPrimaryForDatingProfileInput> = z.object({
  id: z.string().cuid().optional(),
  mimeType: z.string(),
  altText: z.string().optional().nullable(),
  storagePath: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutProfileImageInputSchema),
  primaryForProfile: z.lazy(() => ProfileCreateNestedOneWithoutProfileImageInputSchema).optional(),
  otherForProfiles: z.lazy(() => ProfileCreateNestedManyWithoutOtherImagesInputSchema).optional(),
  otherForDatingProfiles: z.lazy(() => DatingProfileCreateNestedManyWithoutOtherImagesInputSchema).optional()
}).strict();

export const ProfileImageUncheckedCreateWithoutPrimaryForDatingProfileInputSchema: z.ZodType<Prisma.ProfileImageUncheckedCreateWithoutPrimaryForDatingProfileInput> = z.object({
  id: z.string().cuid().optional(),
  mimeType: z.string(),
  userId: z.string(),
  altText: z.string().optional().nullable(),
  storagePath: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  primaryForProfile: z.lazy(() => ProfileUncheckedCreateNestedOneWithoutProfileImageInputSchema).optional(),
  otherForProfiles: z.lazy(() => ProfileUncheckedCreateNestedManyWithoutOtherImagesInputSchema).optional(),
  otherForDatingProfiles: z.lazy(() => DatingProfileUncheckedCreateNestedManyWithoutOtherImagesInputSchema).optional()
}).strict();

export const ProfileImageCreateOrConnectWithoutPrimaryForDatingProfileInputSchema: z.ZodType<Prisma.ProfileImageCreateOrConnectWithoutPrimaryForDatingProfileInput> = z.object({
  where: z.lazy(() => ProfileImageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProfileImageCreateWithoutPrimaryForDatingProfileInputSchema),z.lazy(() => ProfileImageUncheckedCreateWithoutPrimaryForDatingProfileInputSchema) ]),
}).strict();

export const ProfileImageCreateWithoutOtherForDatingProfilesInputSchema: z.ZodType<Prisma.ProfileImageCreateWithoutOtherForDatingProfilesInput> = z.object({
  id: z.string().cuid().optional(),
  mimeType: z.string(),
  altText: z.string().optional().nullable(),
  storagePath: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutProfileImageInputSchema),
  primaryForProfile: z.lazy(() => ProfileCreateNestedOneWithoutProfileImageInputSchema).optional(),
  otherForProfiles: z.lazy(() => ProfileCreateNestedManyWithoutOtherImagesInputSchema).optional(),
  primaryForDatingProfile: z.lazy(() => DatingProfileCreateNestedOneWithoutProfileImageInputSchema).optional()
}).strict();

export const ProfileImageUncheckedCreateWithoutOtherForDatingProfilesInputSchema: z.ZodType<Prisma.ProfileImageUncheckedCreateWithoutOtherForDatingProfilesInput> = z.object({
  id: z.string().cuid().optional(),
  mimeType: z.string(),
  userId: z.string(),
  altText: z.string().optional().nullable(),
  storagePath: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  primaryForProfile: z.lazy(() => ProfileUncheckedCreateNestedOneWithoutProfileImageInputSchema).optional(),
  otherForProfiles: z.lazy(() => ProfileUncheckedCreateNestedManyWithoutOtherImagesInputSchema).optional(),
  primaryForDatingProfile: z.lazy(() => DatingProfileUncheckedCreateNestedOneWithoutProfileImageInputSchema).optional()
}).strict();

export const ProfileImageCreateOrConnectWithoutOtherForDatingProfilesInputSchema: z.ZodType<Prisma.ProfileImageCreateOrConnectWithoutOtherForDatingProfilesInput> = z.object({
  where: z.lazy(() => ProfileImageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProfileImageCreateWithoutOtherForDatingProfilesInputSchema),z.lazy(() => ProfileImageUncheckedCreateWithoutOtherForDatingProfilesInputSchema) ]),
}).strict();

export const UserUpsertWithoutDatingProfileInputSchema: z.ZodType<Prisma.UserUpsertWithoutDatingProfileInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutDatingProfileInputSchema),z.lazy(() => UserUncheckedUpdateWithoutDatingProfileInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutDatingProfileInputSchema),z.lazy(() => UserUncheckedCreateWithoutDatingProfileInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutDatingProfileInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutDatingProfileInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutDatingProfileInputSchema),z.lazy(() => UserUncheckedUpdateWithoutDatingProfileInputSchema) ]),
}).strict();

export const UserUpdateWithoutDatingProfileInputSchema: z.ZodType<Prisma.UserUpdateWithoutDatingProfileInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tokenVersion: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  loginToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  loginTokenExp: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isRegistrationConfirmed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastLoginAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  language: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lookingFor: z.union([ z.lazy(() => UserUpdatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profile: z.lazy(() => ProfileUpdateOneWithoutUserNestedInputSchema).optional(),
  ProfileImage: z.lazy(() => ProfileImageUpdateManyWithoutUserNestedInputSchema).optional(),
  requestsSent: z.lazy(() => ConnectionRequestUpdateManyWithoutFromUserNestedInputSchema).optional(),
  requestsReceived: z.lazy(() => ConnectionRequestUpdateManyWithoutToUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutDatingProfileInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutDatingProfileInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tokenVersion: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  loginToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  loginTokenExp: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isRegistrationConfirmed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastLoginAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  language: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lookingFor: z.union([ z.lazy(() => UserUpdatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profile: z.lazy(() => ProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  ProfileImage: z.lazy(() => ProfileImageUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  requestsSent: z.lazy(() => ConnectionRequestUncheckedUpdateManyWithoutFromUserNestedInputSchema).optional(),
  requestsReceived: z.lazy(() => ConnectionRequestUncheckedUpdateManyWithoutToUserNestedInputSchema).optional()
}).strict();

export const DatingPreferenceUpsertWithoutProfileInputSchema: z.ZodType<Prisma.DatingPreferenceUpsertWithoutProfileInput> = z.object({
  update: z.union([ z.lazy(() => DatingPreferenceUpdateWithoutProfileInputSchema),z.lazy(() => DatingPreferenceUncheckedUpdateWithoutProfileInputSchema) ]),
  create: z.union([ z.lazy(() => DatingPreferenceCreateWithoutProfileInputSchema),z.lazy(() => DatingPreferenceUncheckedCreateWithoutProfileInputSchema) ]),
  where: z.lazy(() => DatingPreferenceWhereInputSchema).optional()
}).strict();

export const DatingPreferenceUpdateToOneWithWhereWithoutProfileInputSchema: z.ZodType<Prisma.DatingPreferenceUpdateToOneWithWhereWithoutProfileInput> = z.object({
  where: z.lazy(() => DatingPreferenceWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => DatingPreferenceUpdateWithoutProfileInputSchema),z.lazy(() => DatingPreferenceUncheckedUpdateWithoutProfileInputSchema) ]),
}).strict();

export const DatingPreferenceUpdateWithoutProfileInputSchema: z.ZodType<Prisma.DatingPreferenceUpdateWithoutProfileInput> = z.object({
  prefGender: z.union([ z.lazy(() => PreferenceGenderSchema),z.lazy(() => EnumPreferenceGenderFieldUpdateOperationsInputSchema) ]).optional(),
  prefAgeMin: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  prefAgeMax: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const DatingPreferenceUncheckedUpdateWithoutProfileInputSchema: z.ZodType<Prisma.DatingPreferenceUncheckedUpdateWithoutProfileInput> = z.object({
  prefGender: z.union([ z.lazy(() => PreferenceGenderSchema),z.lazy(() => EnumPreferenceGenderFieldUpdateOperationsInputSchema) ]).optional(),
  prefAgeMin: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  prefAgeMax: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const DatingProfileTagUpsertWithWhereUniqueWithoutDatingProfileInputSchema: z.ZodType<Prisma.DatingProfileTagUpsertWithWhereUniqueWithoutDatingProfileInput> = z.object({
  where: z.lazy(() => DatingProfileTagWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DatingProfileTagUpdateWithoutDatingProfileInputSchema),z.lazy(() => DatingProfileTagUncheckedUpdateWithoutDatingProfileInputSchema) ]),
  create: z.union([ z.lazy(() => DatingProfileTagCreateWithoutDatingProfileInputSchema),z.lazy(() => DatingProfileTagUncheckedCreateWithoutDatingProfileInputSchema) ]),
}).strict();

export const DatingProfileTagUpdateWithWhereUniqueWithoutDatingProfileInputSchema: z.ZodType<Prisma.DatingProfileTagUpdateWithWhereUniqueWithoutDatingProfileInput> = z.object({
  where: z.lazy(() => DatingProfileTagWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DatingProfileTagUpdateWithoutDatingProfileInputSchema),z.lazy(() => DatingProfileTagUncheckedUpdateWithoutDatingProfileInputSchema) ]),
}).strict();

export const DatingProfileTagUpdateManyWithWhereWithoutDatingProfileInputSchema: z.ZodType<Prisma.DatingProfileTagUpdateManyWithWhereWithoutDatingProfileInput> = z.object({
  where: z.lazy(() => DatingProfileTagScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DatingProfileTagUpdateManyMutationInputSchema),z.lazy(() => DatingProfileTagUncheckedUpdateManyWithoutDatingProfileInputSchema) ]),
}).strict();

export const ProfileImageUpsertWithoutPrimaryForDatingProfileInputSchema: z.ZodType<Prisma.ProfileImageUpsertWithoutPrimaryForDatingProfileInput> = z.object({
  update: z.union([ z.lazy(() => ProfileImageUpdateWithoutPrimaryForDatingProfileInputSchema),z.lazy(() => ProfileImageUncheckedUpdateWithoutPrimaryForDatingProfileInputSchema) ]),
  create: z.union([ z.lazy(() => ProfileImageCreateWithoutPrimaryForDatingProfileInputSchema),z.lazy(() => ProfileImageUncheckedCreateWithoutPrimaryForDatingProfileInputSchema) ]),
  where: z.lazy(() => ProfileImageWhereInputSchema).optional()
}).strict();

export const ProfileImageUpdateToOneWithWhereWithoutPrimaryForDatingProfileInputSchema: z.ZodType<Prisma.ProfileImageUpdateToOneWithWhereWithoutPrimaryForDatingProfileInput> = z.object({
  where: z.lazy(() => ProfileImageWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProfileImageUpdateWithoutPrimaryForDatingProfileInputSchema),z.lazy(() => ProfileImageUncheckedUpdateWithoutPrimaryForDatingProfileInputSchema) ]),
}).strict();

export const ProfileImageUpdateWithoutPrimaryForDatingProfileInputSchema: z.ZodType<Prisma.ProfileImageUpdateWithoutPrimaryForDatingProfileInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  altText: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  storagePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutProfileImageNestedInputSchema).optional(),
  primaryForProfile: z.lazy(() => ProfileUpdateOneWithoutProfileImageNestedInputSchema).optional(),
  otherForProfiles: z.lazy(() => ProfileUpdateManyWithoutOtherImagesNestedInputSchema).optional(),
  otherForDatingProfiles: z.lazy(() => DatingProfileUpdateManyWithoutOtherImagesNestedInputSchema).optional()
}).strict();

export const ProfileImageUncheckedUpdateWithoutPrimaryForDatingProfileInputSchema: z.ZodType<Prisma.ProfileImageUncheckedUpdateWithoutPrimaryForDatingProfileInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  altText: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  storagePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  primaryForProfile: z.lazy(() => ProfileUncheckedUpdateOneWithoutProfileImageNestedInputSchema).optional(),
  otherForProfiles: z.lazy(() => ProfileUncheckedUpdateManyWithoutOtherImagesNestedInputSchema).optional(),
  otherForDatingProfiles: z.lazy(() => DatingProfileUncheckedUpdateManyWithoutOtherImagesNestedInputSchema).optional()
}).strict();

export const ProfileImageUpsertWithWhereUniqueWithoutOtherForDatingProfilesInputSchema: z.ZodType<Prisma.ProfileImageUpsertWithWhereUniqueWithoutOtherForDatingProfilesInput> = z.object({
  where: z.lazy(() => ProfileImageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProfileImageUpdateWithoutOtherForDatingProfilesInputSchema),z.lazy(() => ProfileImageUncheckedUpdateWithoutOtherForDatingProfilesInputSchema) ]),
  create: z.union([ z.lazy(() => ProfileImageCreateWithoutOtherForDatingProfilesInputSchema),z.lazy(() => ProfileImageUncheckedCreateWithoutOtherForDatingProfilesInputSchema) ]),
}).strict();

export const ProfileImageUpdateWithWhereUniqueWithoutOtherForDatingProfilesInputSchema: z.ZodType<Prisma.ProfileImageUpdateWithWhereUniqueWithoutOtherForDatingProfilesInput> = z.object({
  where: z.lazy(() => ProfileImageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProfileImageUpdateWithoutOtherForDatingProfilesInputSchema),z.lazy(() => ProfileImageUncheckedUpdateWithoutOtherForDatingProfilesInputSchema) ]),
}).strict();

export const ProfileImageUpdateManyWithWhereWithoutOtherForDatingProfilesInputSchema: z.ZodType<Prisma.ProfileImageUpdateManyWithWhereWithoutOtherForDatingProfilesInput> = z.object({
  where: z.lazy(() => ProfileImageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProfileImageUpdateManyMutationInputSchema),z.lazy(() => ProfileImageUncheckedUpdateManyWithoutOtherForDatingProfilesInputSchema) ]),
}).strict();

export const UserCreateWithoutProfileImageInputSchema: z.ZodType<Prisma.UserCreateWithoutProfileImageInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  tokenVersion: z.number().int().optional(),
  loginToken: z.string().optional().nullable(),
  loginTokenExp: z.coerce.date().optional().nullable(),
  isActive: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  isRegistrationConfirmed: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lastLoginAt: z.coerce.date().optional().nullable(),
  language: z.string().optional().nullable(),
  lookingFor: z.union([ z.lazy(() => UserCreatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutUserInputSchema).optional(),
  datingProfile: z.lazy(() => DatingProfileCreateNestedOneWithoutUserInputSchema).optional(),
  requestsSent: z.lazy(() => ConnectionRequestCreateNestedManyWithoutFromUserInputSchema).optional(),
  requestsReceived: z.lazy(() => ConnectionRequestCreateNestedManyWithoutToUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutProfileImageInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutProfileImageInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  tokenVersion: z.number().int().optional(),
  loginToken: z.string().optional().nullable(),
  loginTokenExp: z.coerce.date().optional().nullable(),
  isActive: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  isRegistrationConfirmed: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lastLoginAt: z.coerce.date().optional().nullable(),
  language: z.string().optional().nullable(),
  lookingFor: z.union([ z.lazy(() => UserCreatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  profile: z.lazy(() => ProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  datingProfile: z.lazy(() => DatingProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  requestsSent: z.lazy(() => ConnectionRequestUncheckedCreateNestedManyWithoutFromUserInputSchema).optional(),
  requestsReceived: z.lazy(() => ConnectionRequestUncheckedCreateNestedManyWithoutToUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutProfileImageInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutProfileImageInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutProfileImageInputSchema),z.lazy(() => UserUncheckedCreateWithoutProfileImageInputSchema) ]),
}).strict();

export const ProfileCreateWithoutProfileImageInputSchema: z.ZodType<Prisma.ProfileCreateWithoutProfileImageInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  intro: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutProfileInputSchema),
  tags: z.lazy(() => ProfileTagCreateNestedManyWithoutProfileInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageCreateNestedManyWithoutOtherForProfilesInputSchema).optional()
}).strict();

export const ProfileUncheckedCreateWithoutProfileImageInputSchema: z.ZodType<Prisma.ProfileUncheckedCreateWithoutProfileImageInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  intro: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tags: z.lazy(() => ProfileTagUncheckedCreateNestedManyWithoutProfileInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageUncheckedCreateNestedManyWithoutOtherForProfilesInputSchema).optional()
}).strict();

export const ProfileCreateOrConnectWithoutProfileImageInputSchema: z.ZodType<Prisma.ProfileCreateOrConnectWithoutProfileImageInput> = z.object({
  where: z.lazy(() => ProfileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProfileCreateWithoutProfileImageInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutProfileImageInputSchema) ]),
}).strict();

export const ProfileCreateWithoutOtherImagesInputSchema: z.ZodType<Prisma.ProfileCreateWithoutOtherImagesInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  intro: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutProfileInputSchema),
  tags: z.lazy(() => ProfileTagCreateNestedManyWithoutProfileInputSchema).optional(),
  profileImage: z.lazy(() => ProfileImageCreateNestedOneWithoutPrimaryForProfileInputSchema).optional()
}).strict();

export const ProfileUncheckedCreateWithoutOtherImagesInputSchema: z.ZodType<Prisma.ProfileUncheckedCreateWithoutOtherImagesInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  intro: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  userId: z.string(),
  profileImageId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tags: z.lazy(() => ProfileTagUncheckedCreateNestedManyWithoutProfileInputSchema).optional()
}).strict();

export const ProfileCreateOrConnectWithoutOtherImagesInputSchema: z.ZodType<Prisma.ProfileCreateOrConnectWithoutOtherImagesInput> = z.object({
  where: z.lazy(() => ProfileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProfileCreateWithoutOtherImagesInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutOtherImagesInputSchema) ]),
}).strict();

export const DatingProfileCreateWithoutProfileImageInputSchema: z.ZodType<Prisma.DatingProfileCreateWithoutProfileImageInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  intro: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  birthday: z.coerce.date().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional(),
  relationship: z.lazy(() => RelationshipStatusSchema).optional(),
  hasKids: z.boolean().optional().nullable(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutDatingProfileInputSchema),
  datingPreference: z.lazy(() => DatingPreferenceCreateNestedOneWithoutProfileInputSchema).optional(),
  tags: z.lazy(() => DatingProfileTagCreateNestedManyWithoutDatingProfileInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageCreateNestedManyWithoutOtherForDatingProfilesInputSchema).optional()
}).strict();

export const DatingProfileUncheckedCreateWithoutProfileImageInputSchema: z.ZodType<Prisma.DatingProfileUncheckedCreateWithoutProfileImageInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  intro: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  birthday: z.coerce.date().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional(),
  relationship: z.lazy(() => RelationshipStatusSchema).optional(),
  hasKids: z.boolean().optional().nullable(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  datingPreference: z.lazy(() => DatingPreferenceUncheckedCreateNestedOneWithoutProfileInputSchema).optional(),
  tags: z.lazy(() => DatingProfileTagUncheckedCreateNestedManyWithoutDatingProfileInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageUncheckedCreateNestedManyWithoutOtherForDatingProfilesInputSchema).optional()
}).strict();

export const DatingProfileCreateOrConnectWithoutProfileImageInputSchema: z.ZodType<Prisma.DatingProfileCreateOrConnectWithoutProfileImageInput> = z.object({
  where: z.lazy(() => DatingProfileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DatingProfileCreateWithoutProfileImageInputSchema),z.lazy(() => DatingProfileUncheckedCreateWithoutProfileImageInputSchema) ]),
}).strict();

export const DatingProfileCreateWithoutOtherImagesInputSchema: z.ZodType<Prisma.DatingProfileCreateWithoutOtherImagesInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  intro: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  birthday: z.coerce.date().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional(),
  relationship: z.lazy(() => RelationshipStatusSchema).optional(),
  hasKids: z.boolean().optional().nullable(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutDatingProfileInputSchema),
  datingPreference: z.lazy(() => DatingPreferenceCreateNestedOneWithoutProfileInputSchema).optional(),
  tags: z.lazy(() => DatingProfileTagCreateNestedManyWithoutDatingProfileInputSchema).optional(),
  profileImage: z.lazy(() => ProfileImageCreateNestedOneWithoutPrimaryForDatingProfileInputSchema).optional()
}).strict();

export const DatingProfileUncheckedCreateWithoutOtherImagesInputSchema: z.ZodType<Prisma.DatingProfileUncheckedCreateWithoutOtherImagesInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  intro: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  birthday: z.coerce.date().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional(),
  relationship: z.lazy(() => RelationshipStatusSchema).optional(),
  hasKids: z.boolean().optional().nullable(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  profileImageId: z.string().optional().nullable(),
  datingPreference: z.lazy(() => DatingPreferenceUncheckedCreateNestedOneWithoutProfileInputSchema).optional(),
  tags: z.lazy(() => DatingProfileTagUncheckedCreateNestedManyWithoutDatingProfileInputSchema).optional()
}).strict();

export const DatingProfileCreateOrConnectWithoutOtherImagesInputSchema: z.ZodType<Prisma.DatingProfileCreateOrConnectWithoutOtherImagesInput> = z.object({
  where: z.lazy(() => DatingProfileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DatingProfileCreateWithoutOtherImagesInputSchema),z.lazy(() => DatingProfileUncheckedCreateWithoutOtherImagesInputSchema) ]),
}).strict();

export const UserUpsertWithoutProfileImageInputSchema: z.ZodType<Prisma.UserUpsertWithoutProfileImageInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutProfileImageInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProfileImageInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutProfileImageInputSchema),z.lazy(() => UserUncheckedCreateWithoutProfileImageInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutProfileImageInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutProfileImageInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutProfileImageInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProfileImageInputSchema) ]),
}).strict();

export const UserUpdateWithoutProfileImageInputSchema: z.ZodType<Prisma.UserUpdateWithoutProfileImageInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tokenVersion: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  loginToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  loginTokenExp: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isRegistrationConfirmed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastLoginAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  language: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lookingFor: z.union([ z.lazy(() => UserUpdatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profile: z.lazy(() => ProfileUpdateOneWithoutUserNestedInputSchema).optional(),
  datingProfile: z.lazy(() => DatingProfileUpdateOneWithoutUserNestedInputSchema).optional(),
  requestsSent: z.lazy(() => ConnectionRequestUpdateManyWithoutFromUserNestedInputSchema).optional(),
  requestsReceived: z.lazy(() => ConnectionRequestUpdateManyWithoutToUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutProfileImageInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutProfileImageInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tokenVersion: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  loginToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  loginTokenExp: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isRegistrationConfirmed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastLoginAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  language: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lookingFor: z.union([ z.lazy(() => UserUpdatelookingForInputSchema),z.lazy(() => ConnectionTypeSchema).array() ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profile: z.lazy(() => ProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  datingProfile: z.lazy(() => DatingProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  requestsSent: z.lazy(() => ConnectionRequestUncheckedUpdateManyWithoutFromUserNestedInputSchema).optional(),
  requestsReceived: z.lazy(() => ConnectionRequestUncheckedUpdateManyWithoutToUserNestedInputSchema).optional()
}).strict();

export const ProfileUpsertWithoutProfileImageInputSchema: z.ZodType<Prisma.ProfileUpsertWithoutProfileImageInput> = z.object({
  update: z.union([ z.lazy(() => ProfileUpdateWithoutProfileImageInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutProfileImageInputSchema) ]),
  create: z.union([ z.lazy(() => ProfileCreateWithoutProfileImageInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutProfileImageInputSchema) ]),
  where: z.lazy(() => ProfileWhereInputSchema).optional()
}).strict();

export const ProfileUpdateToOneWithWhereWithoutProfileImageInputSchema: z.ZodType<Prisma.ProfileUpdateToOneWithWhereWithoutProfileImageInput> = z.object({
  where: z.lazy(() => ProfileWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProfileUpdateWithoutProfileImageInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutProfileImageInputSchema) ]),
}).strict();

export const ProfileUpdateWithoutProfileImageInputSchema: z.ZodType<Prisma.ProfileUpdateWithoutProfileImageInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  intro: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutProfileNestedInputSchema).optional(),
  tags: z.lazy(() => ProfileTagUpdateManyWithoutProfileNestedInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageUpdateManyWithoutOtherForProfilesNestedInputSchema).optional()
}).strict();

export const ProfileUncheckedUpdateWithoutProfileImageInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateWithoutProfileImageInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  intro: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => ProfileTagUncheckedUpdateManyWithoutProfileNestedInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageUncheckedUpdateManyWithoutOtherForProfilesNestedInputSchema).optional()
}).strict();

export const ProfileUpsertWithWhereUniqueWithoutOtherImagesInputSchema: z.ZodType<Prisma.ProfileUpsertWithWhereUniqueWithoutOtherImagesInput> = z.object({
  where: z.lazy(() => ProfileWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProfileUpdateWithoutOtherImagesInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutOtherImagesInputSchema) ]),
  create: z.union([ z.lazy(() => ProfileCreateWithoutOtherImagesInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutOtherImagesInputSchema) ]),
}).strict();

export const ProfileUpdateWithWhereUniqueWithoutOtherImagesInputSchema: z.ZodType<Prisma.ProfileUpdateWithWhereUniqueWithoutOtherImagesInput> = z.object({
  where: z.lazy(() => ProfileWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProfileUpdateWithoutOtherImagesInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutOtherImagesInputSchema) ]),
}).strict();

export const ProfileUpdateManyWithWhereWithoutOtherImagesInputSchema: z.ZodType<Prisma.ProfileUpdateManyWithWhereWithoutOtherImagesInput> = z.object({
  where: z.lazy(() => ProfileScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProfileUpdateManyMutationInputSchema),z.lazy(() => ProfileUncheckedUpdateManyWithoutOtherImagesInputSchema) ]),
}).strict();

export const ProfileScalarWhereInputSchema: z.ZodType<Prisma.ProfileScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProfileScalarWhereInputSchema),z.lazy(() => ProfileScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfileScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfileScalarWhereInputSchema),z.lazy(() => ProfileScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  publicName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  intro: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  country: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isReported: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isBlocked: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  profileImageId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const DatingProfileUpsertWithoutProfileImageInputSchema: z.ZodType<Prisma.DatingProfileUpsertWithoutProfileImageInput> = z.object({
  update: z.union([ z.lazy(() => DatingProfileUpdateWithoutProfileImageInputSchema),z.lazy(() => DatingProfileUncheckedUpdateWithoutProfileImageInputSchema) ]),
  create: z.union([ z.lazy(() => DatingProfileCreateWithoutProfileImageInputSchema),z.lazy(() => DatingProfileUncheckedCreateWithoutProfileImageInputSchema) ]),
  where: z.lazy(() => DatingProfileWhereInputSchema).optional()
}).strict();

export const DatingProfileUpdateToOneWithWhereWithoutProfileImageInputSchema: z.ZodType<Prisma.DatingProfileUpdateToOneWithWhereWithoutProfileImageInput> = z.object({
  where: z.lazy(() => DatingProfileWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => DatingProfileUpdateWithoutProfileImageInputSchema),z.lazy(() => DatingProfileUncheckedUpdateWithoutProfileImageInputSchema) ]),
}).strict();

export const DatingProfileUpdateWithoutProfileImageInputSchema: z.ZodType<Prisma.DatingProfileUpdateWithoutProfileImageInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  intro: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  relationship: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => EnumRelationshipStatusFieldUpdateOperationsInputSchema) ]).optional(),
  hasKids: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutDatingProfileNestedInputSchema).optional(),
  datingPreference: z.lazy(() => DatingPreferenceUpdateOneWithoutProfileNestedInputSchema).optional(),
  tags: z.lazy(() => DatingProfileTagUpdateManyWithoutDatingProfileNestedInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageUpdateManyWithoutOtherForDatingProfilesNestedInputSchema).optional()
}).strict();

export const DatingProfileUncheckedUpdateWithoutProfileImageInputSchema: z.ZodType<Prisma.DatingProfileUncheckedUpdateWithoutProfileImageInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  intro: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  relationship: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => EnumRelationshipStatusFieldUpdateOperationsInputSchema) ]).optional(),
  hasKids: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  datingPreference: z.lazy(() => DatingPreferenceUncheckedUpdateOneWithoutProfileNestedInputSchema).optional(),
  tags: z.lazy(() => DatingProfileTagUncheckedUpdateManyWithoutDatingProfileNestedInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageUncheckedUpdateManyWithoutOtherForDatingProfilesNestedInputSchema).optional()
}).strict();

export const DatingProfileUpsertWithWhereUniqueWithoutOtherImagesInputSchema: z.ZodType<Prisma.DatingProfileUpsertWithWhereUniqueWithoutOtherImagesInput> = z.object({
  where: z.lazy(() => DatingProfileWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DatingProfileUpdateWithoutOtherImagesInputSchema),z.lazy(() => DatingProfileUncheckedUpdateWithoutOtherImagesInputSchema) ]),
  create: z.union([ z.lazy(() => DatingProfileCreateWithoutOtherImagesInputSchema),z.lazy(() => DatingProfileUncheckedCreateWithoutOtherImagesInputSchema) ]),
}).strict();

export const DatingProfileUpdateWithWhereUniqueWithoutOtherImagesInputSchema: z.ZodType<Prisma.DatingProfileUpdateWithWhereUniqueWithoutOtherImagesInput> = z.object({
  where: z.lazy(() => DatingProfileWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DatingProfileUpdateWithoutOtherImagesInputSchema),z.lazy(() => DatingProfileUncheckedUpdateWithoutOtherImagesInputSchema) ]),
}).strict();

export const DatingProfileUpdateManyWithWhereWithoutOtherImagesInputSchema: z.ZodType<Prisma.DatingProfileUpdateManyWithWhereWithoutOtherImagesInput> = z.object({
  where: z.lazy(() => DatingProfileScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DatingProfileUpdateManyMutationInputSchema),z.lazy(() => DatingProfileUncheckedUpdateManyWithoutOtherImagesInputSchema) ]),
}).strict();

export const DatingProfileScalarWhereInputSchema: z.ZodType<Prisma.DatingProfileScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DatingProfileScalarWhereInputSchema),z.lazy(() => DatingProfileScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DatingProfileScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DatingProfileScalarWhereInputSchema),z.lazy(() => DatingProfileScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  publicName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  intro: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  country: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  birthday: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  gender: z.union([ z.lazy(() => EnumGenderFilterSchema),z.lazy(() => GenderSchema) ]).optional(),
  relationship: z.union([ z.lazy(() => EnumRelationshipStatusFilterSchema),z.lazy(() => RelationshipStatusSchema) ]).optional(),
  hasKids: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isReported: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isBlocked: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  profileImageId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ProfileTagCreateManyTagInputSchema: z.ZodType<Prisma.ProfileTagCreateManyTagInput> = z.object({
  id: z.string().cuid().optional(),
  profileId: z.string()
}).strict();

export const DatingProfileTagCreateManyTagInputSchema: z.ZodType<Prisma.DatingProfileTagCreateManyTagInput> = z.object({
  id: z.string().cuid().optional(),
  datingProfileId: z.string()
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

export const DatingProfileTagUpdateWithoutTagInputSchema: z.ZodType<Prisma.DatingProfileTagUpdateWithoutTagInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  datingProfile: z.lazy(() => DatingProfileUpdateOneRequiredWithoutTagsNestedInputSchema).optional()
}).strict();

export const DatingProfileTagUncheckedUpdateWithoutTagInputSchema: z.ZodType<Prisma.DatingProfileTagUncheckedUpdateWithoutTagInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  datingProfileId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DatingProfileTagUncheckedUpdateManyWithoutTagInputSchema: z.ZodType<Prisma.DatingProfileTagUncheckedUpdateManyWithoutTagInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  datingProfileId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfileImageCreateManyUserInputSchema: z.ZodType<Prisma.ProfileImageCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  mimeType: z.string(),
  altText: z.string().optional().nullable(),
  storagePath: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ConnectionRequestCreateManyFromUserInputSchema: z.ZodType<Prisma.ConnectionRequestCreateManyFromUserInput> = z.object({
  id: z.string().cuid().optional(),
  toUserId: z.string(),
  scope: z.lazy(() => ConnectionTypeSchema),
  status: z.lazy(() => ConnectionStatusSchema),
  createdAt: z.coerce.date().optional()
}).strict();

export const ConnectionRequestCreateManyToUserInputSchema: z.ZodType<Prisma.ConnectionRequestCreateManyToUserInput> = z.object({
  id: z.string().cuid().optional(),
  fromUserId: z.string(),
  scope: z.lazy(() => ConnectionTypeSchema),
  status: z.lazy(() => ConnectionStatusSchema),
  createdAt: z.coerce.date().optional()
}).strict();

export const ProfileImageUpdateWithoutUserInputSchema: z.ZodType<Prisma.ProfileImageUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  altText: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  storagePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  primaryForProfile: z.lazy(() => ProfileUpdateOneWithoutProfileImageNestedInputSchema).optional(),
  otherForProfiles: z.lazy(() => ProfileUpdateManyWithoutOtherImagesNestedInputSchema).optional(),
  primaryForDatingProfile: z.lazy(() => DatingProfileUpdateOneWithoutProfileImageNestedInputSchema).optional(),
  otherForDatingProfiles: z.lazy(() => DatingProfileUpdateManyWithoutOtherImagesNestedInputSchema).optional()
}).strict();

export const ProfileImageUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ProfileImageUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  altText: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  storagePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  primaryForProfile: z.lazy(() => ProfileUncheckedUpdateOneWithoutProfileImageNestedInputSchema).optional(),
  otherForProfiles: z.lazy(() => ProfileUncheckedUpdateManyWithoutOtherImagesNestedInputSchema).optional(),
  primaryForDatingProfile: z.lazy(() => DatingProfileUncheckedUpdateOneWithoutProfileImageNestedInputSchema).optional(),
  otherForDatingProfiles: z.lazy(() => DatingProfileUncheckedUpdateManyWithoutOtherImagesNestedInputSchema).optional()
}).strict();

export const ProfileImageUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.ProfileImageUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  altText: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  storagePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ConnectionRequestUpdateWithoutFromUserInputSchema: z.ZodType<Prisma.ConnectionRequestUpdateWithoutFromUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => ConnectionTypeSchema),z.lazy(() => EnumConnectionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ConnectionStatusSchema),z.lazy(() => EnumConnectionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  toUser: z.lazy(() => UserUpdateOneRequiredWithoutRequestsReceivedNestedInputSchema).optional()
}).strict();

export const ConnectionRequestUncheckedUpdateWithoutFromUserInputSchema: z.ZodType<Prisma.ConnectionRequestUncheckedUpdateWithoutFromUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  toUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => ConnectionTypeSchema),z.lazy(() => EnumConnectionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ConnectionStatusSchema),z.lazy(() => EnumConnectionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ConnectionRequestUncheckedUpdateManyWithoutFromUserInputSchema: z.ZodType<Prisma.ConnectionRequestUncheckedUpdateManyWithoutFromUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  toUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => ConnectionTypeSchema),z.lazy(() => EnumConnectionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ConnectionStatusSchema),z.lazy(() => EnumConnectionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ConnectionRequestUpdateWithoutToUserInputSchema: z.ZodType<Prisma.ConnectionRequestUpdateWithoutToUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => ConnectionTypeSchema),z.lazy(() => EnumConnectionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ConnectionStatusSchema),z.lazy(() => EnumConnectionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fromUser: z.lazy(() => UserUpdateOneRequiredWithoutRequestsSentNestedInputSchema).optional()
}).strict();

export const ConnectionRequestUncheckedUpdateWithoutToUserInputSchema: z.ZodType<Prisma.ConnectionRequestUncheckedUpdateWithoutToUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fromUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => ConnectionTypeSchema),z.lazy(() => EnumConnectionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ConnectionStatusSchema),z.lazy(() => EnumConnectionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ConnectionRequestUncheckedUpdateManyWithoutToUserInputSchema: z.ZodType<Prisma.ConnectionRequestUncheckedUpdateManyWithoutToUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fromUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => ConnectionTypeSchema),z.lazy(() => EnumConnectionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ConnectionStatusSchema),z.lazy(() => EnumConnectionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfileTagCreateManyProfileInputSchema: z.ZodType<Prisma.ProfileTagCreateManyProfileInput> = z.object({
  id: z.string().cuid().optional(),
  tagId: z.number().int()
}).strict();

export const ProfileTagUpdateWithoutProfileInputSchema: z.ZodType<Prisma.ProfileTagUpdateWithoutProfileInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tag: z.lazy(() => TagUpdateOneRequiredWithoutProfileTagsNestedInputSchema).optional()
}).strict();

export const ProfileTagUncheckedUpdateWithoutProfileInputSchema: z.ZodType<Prisma.ProfileTagUncheckedUpdateWithoutProfileInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfileTagUncheckedUpdateManyWithoutProfileInputSchema: z.ZodType<Prisma.ProfileTagUncheckedUpdateManyWithoutProfileInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfileImageUpdateWithoutOtherForProfilesInputSchema: z.ZodType<Prisma.ProfileImageUpdateWithoutOtherForProfilesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  altText: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  storagePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutProfileImageNestedInputSchema).optional(),
  primaryForProfile: z.lazy(() => ProfileUpdateOneWithoutProfileImageNestedInputSchema).optional(),
  primaryForDatingProfile: z.lazy(() => DatingProfileUpdateOneWithoutProfileImageNestedInputSchema).optional(),
  otherForDatingProfiles: z.lazy(() => DatingProfileUpdateManyWithoutOtherImagesNestedInputSchema).optional()
}).strict();

export const ProfileImageUncheckedUpdateWithoutOtherForProfilesInputSchema: z.ZodType<Prisma.ProfileImageUncheckedUpdateWithoutOtherForProfilesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  altText: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  storagePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  primaryForProfile: z.lazy(() => ProfileUncheckedUpdateOneWithoutProfileImageNestedInputSchema).optional(),
  primaryForDatingProfile: z.lazy(() => DatingProfileUncheckedUpdateOneWithoutProfileImageNestedInputSchema).optional(),
  otherForDatingProfiles: z.lazy(() => DatingProfileUncheckedUpdateManyWithoutOtherImagesNestedInputSchema).optional()
}).strict();

export const ProfileImageUncheckedUpdateManyWithoutOtherForProfilesInputSchema: z.ZodType<Prisma.ProfileImageUncheckedUpdateManyWithoutOtherForProfilesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  altText: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  storagePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DatingProfileTagCreateManyDatingProfileInputSchema: z.ZodType<Prisma.DatingProfileTagCreateManyDatingProfileInput> = z.object({
  id: z.string().cuid().optional(),
  tagId: z.number().int()
}).strict();

export const DatingProfileTagUpdateWithoutDatingProfileInputSchema: z.ZodType<Prisma.DatingProfileTagUpdateWithoutDatingProfileInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tag: z.lazy(() => TagUpdateOneRequiredWithoutDatingProfileTagNestedInputSchema).optional()
}).strict();

export const DatingProfileTagUncheckedUpdateWithoutDatingProfileInputSchema: z.ZodType<Prisma.DatingProfileTagUncheckedUpdateWithoutDatingProfileInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DatingProfileTagUncheckedUpdateManyWithoutDatingProfileInputSchema: z.ZodType<Prisma.DatingProfileTagUncheckedUpdateManyWithoutDatingProfileInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfileImageUpdateWithoutOtherForDatingProfilesInputSchema: z.ZodType<Prisma.ProfileImageUpdateWithoutOtherForDatingProfilesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  altText: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  storagePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutProfileImageNestedInputSchema).optional(),
  primaryForProfile: z.lazy(() => ProfileUpdateOneWithoutProfileImageNestedInputSchema).optional(),
  otherForProfiles: z.lazy(() => ProfileUpdateManyWithoutOtherImagesNestedInputSchema).optional(),
  primaryForDatingProfile: z.lazy(() => DatingProfileUpdateOneWithoutProfileImageNestedInputSchema).optional()
}).strict();

export const ProfileImageUncheckedUpdateWithoutOtherForDatingProfilesInputSchema: z.ZodType<Prisma.ProfileImageUncheckedUpdateWithoutOtherForDatingProfilesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  altText: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  storagePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  primaryForProfile: z.lazy(() => ProfileUncheckedUpdateOneWithoutProfileImageNestedInputSchema).optional(),
  otherForProfiles: z.lazy(() => ProfileUncheckedUpdateManyWithoutOtherImagesNestedInputSchema).optional(),
  primaryForDatingProfile: z.lazy(() => DatingProfileUncheckedUpdateOneWithoutProfileImageNestedInputSchema).optional()
}).strict();

export const ProfileImageUncheckedUpdateManyWithoutOtherForDatingProfilesInputSchema: z.ZodType<Prisma.ProfileImageUncheckedUpdateManyWithoutOtherForDatingProfilesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  altText: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  storagePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfileUpdateWithoutOtherImagesInputSchema: z.ZodType<Prisma.ProfileUpdateWithoutOtherImagesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  intro: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutProfileNestedInputSchema).optional(),
  tags: z.lazy(() => ProfileTagUpdateManyWithoutProfileNestedInputSchema).optional(),
  profileImage: z.lazy(() => ProfileImageUpdateOneWithoutPrimaryForProfileNestedInputSchema).optional()
}).strict();

export const ProfileUncheckedUpdateWithoutOtherImagesInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateWithoutOtherImagesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  intro: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => ProfileTagUncheckedUpdateManyWithoutProfileNestedInputSchema).optional()
}).strict();

export const ProfileUncheckedUpdateManyWithoutOtherImagesInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateManyWithoutOtherImagesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  intro: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DatingProfileUpdateWithoutOtherImagesInputSchema: z.ZodType<Prisma.DatingProfileUpdateWithoutOtherImagesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  intro: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  relationship: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => EnumRelationshipStatusFieldUpdateOperationsInputSchema) ]).optional(),
  hasKids: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutDatingProfileNestedInputSchema).optional(),
  datingPreference: z.lazy(() => DatingPreferenceUpdateOneWithoutProfileNestedInputSchema).optional(),
  tags: z.lazy(() => DatingProfileTagUpdateManyWithoutDatingProfileNestedInputSchema).optional(),
  profileImage: z.lazy(() => ProfileImageUpdateOneWithoutPrimaryForDatingProfileNestedInputSchema).optional()
}).strict();

export const DatingProfileUncheckedUpdateWithoutOtherImagesInputSchema: z.ZodType<Prisma.DatingProfileUncheckedUpdateWithoutOtherImagesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  intro: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  relationship: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => EnumRelationshipStatusFieldUpdateOperationsInputSchema) ]).optional(),
  hasKids: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  datingPreference: z.lazy(() => DatingPreferenceUncheckedUpdateOneWithoutProfileNestedInputSchema).optional(),
  tags: z.lazy(() => DatingProfileTagUncheckedUpdateManyWithoutDatingProfileNestedInputSchema).optional()
}).strict();

export const DatingProfileUncheckedUpdateManyWithoutOtherImagesInputSchema: z.ZodType<Prisma.DatingProfileUncheckedUpdateManyWithoutOtherImagesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  intro: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  relationship: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => EnumRelationshipStatusFieldUpdateOperationsInputSchema) ]).optional(),
  hasKids: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

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

export const DatingProfileTagFindFirstArgsSchema: z.ZodType<Prisma.DatingProfileTagFindFirstArgs> = z.object({
  select: DatingProfileTagSelectSchema.optional(),
  include: DatingProfileTagIncludeSchema.optional(),
  where: DatingProfileTagWhereInputSchema.optional(),
  orderBy: z.union([ DatingProfileTagOrderByWithRelationInputSchema.array(),DatingProfileTagOrderByWithRelationInputSchema ]).optional(),
  cursor: DatingProfileTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DatingProfileTagScalarFieldEnumSchema,DatingProfileTagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DatingProfileTagFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DatingProfileTagFindFirstOrThrowArgs> = z.object({
  select: DatingProfileTagSelectSchema.optional(),
  include: DatingProfileTagIncludeSchema.optional(),
  where: DatingProfileTagWhereInputSchema.optional(),
  orderBy: z.union([ DatingProfileTagOrderByWithRelationInputSchema.array(),DatingProfileTagOrderByWithRelationInputSchema ]).optional(),
  cursor: DatingProfileTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DatingProfileTagScalarFieldEnumSchema,DatingProfileTagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DatingProfileTagFindManyArgsSchema: z.ZodType<Prisma.DatingProfileTagFindManyArgs> = z.object({
  select: DatingProfileTagSelectSchema.optional(),
  include: DatingProfileTagIncludeSchema.optional(),
  where: DatingProfileTagWhereInputSchema.optional(),
  orderBy: z.union([ DatingProfileTagOrderByWithRelationInputSchema.array(),DatingProfileTagOrderByWithRelationInputSchema ]).optional(),
  cursor: DatingProfileTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DatingProfileTagScalarFieldEnumSchema,DatingProfileTagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DatingProfileTagAggregateArgsSchema: z.ZodType<Prisma.DatingProfileTagAggregateArgs> = z.object({
  where: DatingProfileTagWhereInputSchema.optional(),
  orderBy: z.union([ DatingProfileTagOrderByWithRelationInputSchema.array(),DatingProfileTagOrderByWithRelationInputSchema ]).optional(),
  cursor: DatingProfileTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DatingProfileTagGroupByArgsSchema: z.ZodType<Prisma.DatingProfileTagGroupByArgs> = z.object({
  where: DatingProfileTagWhereInputSchema.optional(),
  orderBy: z.union([ DatingProfileTagOrderByWithAggregationInputSchema.array(),DatingProfileTagOrderByWithAggregationInputSchema ]).optional(),
  by: DatingProfileTagScalarFieldEnumSchema.array(),
  having: DatingProfileTagScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DatingProfileTagFindUniqueArgsSchema: z.ZodType<Prisma.DatingProfileTagFindUniqueArgs> = z.object({
  select: DatingProfileTagSelectSchema.optional(),
  include: DatingProfileTagIncludeSchema.optional(),
  where: DatingProfileTagWhereUniqueInputSchema,
}).strict() ;

export const DatingProfileTagFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DatingProfileTagFindUniqueOrThrowArgs> = z.object({
  select: DatingProfileTagSelectSchema.optional(),
  include: DatingProfileTagIncludeSchema.optional(),
  where: DatingProfileTagWhereUniqueInputSchema,
}).strict() ;

export const DatingPreferenceFindFirstArgsSchema: z.ZodType<Prisma.DatingPreferenceFindFirstArgs> = z.object({
  select: DatingPreferenceSelectSchema.optional(),
  include: DatingPreferenceIncludeSchema.optional(),
  where: DatingPreferenceWhereInputSchema.optional(),
  orderBy: z.union([ DatingPreferenceOrderByWithRelationInputSchema.array(),DatingPreferenceOrderByWithRelationInputSchema ]).optional(),
  cursor: DatingPreferenceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DatingPreferenceScalarFieldEnumSchema,DatingPreferenceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DatingPreferenceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DatingPreferenceFindFirstOrThrowArgs> = z.object({
  select: DatingPreferenceSelectSchema.optional(),
  include: DatingPreferenceIncludeSchema.optional(),
  where: DatingPreferenceWhereInputSchema.optional(),
  orderBy: z.union([ DatingPreferenceOrderByWithRelationInputSchema.array(),DatingPreferenceOrderByWithRelationInputSchema ]).optional(),
  cursor: DatingPreferenceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DatingPreferenceScalarFieldEnumSchema,DatingPreferenceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DatingPreferenceFindManyArgsSchema: z.ZodType<Prisma.DatingPreferenceFindManyArgs> = z.object({
  select: DatingPreferenceSelectSchema.optional(),
  include: DatingPreferenceIncludeSchema.optional(),
  where: DatingPreferenceWhereInputSchema.optional(),
  orderBy: z.union([ DatingPreferenceOrderByWithRelationInputSchema.array(),DatingPreferenceOrderByWithRelationInputSchema ]).optional(),
  cursor: DatingPreferenceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DatingPreferenceScalarFieldEnumSchema,DatingPreferenceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DatingPreferenceAggregateArgsSchema: z.ZodType<Prisma.DatingPreferenceAggregateArgs> = z.object({
  where: DatingPreferenceWhereInputSchema.optional(),
  orderBy: z.union([ DatingPreferenceOrderByWithRelationInputSchema.array(),DatingPreferenceOrderByWithRelationInputSchema ]).optional(),
  cursor: DatingPreferenceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DatingPreferenceGroupByArgsSchema: z.ZodType<Prisma.DatingPreferenceGroupByArgs> = z.object({
  where: DatingPreferenceWhereInputSchema.optional(),
  orderBy: z.union([ DatingPreferenceOrderByWithAggregationInputSchema.array(),DatingPreferenceOrderByWithAggregationInputSchema ]).optional(),
  by: DatingPreferenceScalarFieldEnumSchema.array(),
  having: DatingPreferenceScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DatingPreferenceFindUniqueArgsSchema: z.ZodType<Prisma.DatingPreferenceFindUniqueArgs> = z.object({
  select: DatingPreferenceSelectSchema.optional(),
  include: DatingPreferenceIncludeSchema.optional(),
  where: DatingPreferenceWhereUniqueInputSchema,
}).strict() ;

export const DatingPreferenceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DatingPreferenceFindUniqueOrThrowArgs> = z.object({
  select: DatingPreferenceSelectSchema.optional(),
  include: DatingPreferenceIncludeSchema.optional(),
  where: DatingPreferenceWhereUniqueInputSchema,
}).strict() ;

export const ConnectionRequestFindFirstArgsSchema: z.ZodType<Prisma.ConnectionRequestFindFirstArgs> = z.object({
  select: ConnectionRequestSelectSchema.optional(),
  include: ConnectionRequestIncludeSchema.optional(),
  where: ConnectionRequestWhereInputSchema.optional(),
  orderBy: z.union([ ConnectionRequestOrderByWithRelationInputSchema.array(),ConnectionRequestOrderByWithRelationInputSchema ]).optional(),
  cursor: ConnectionRequestWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ConnectionRequestScalarFieldEnumSchema,ConnectionRequestScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ConnectionRequestFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ConnectionRequestFindFirstOrThrowArgs> = z.object({
  select: ConnectionRequestSelectSchema.optional(),
  include: ConnectionRequestIncludeSchema.optional(),
  where: ConnectionRequestWhereInputSchema.optional(),
  orderBy: z.union([ ConnectionRequestOrderByWithRelationInputSchema.array(),ConnectionRequestOrderByWithRelationInputSchema ]).optional(),
  cursor: ConnectionRequestWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ConnectionRequestScalarFieldEnumSchema,ConnectionRequestScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ConnectionRequestFindManyArgsSchema: z.ZodType<Prisma.ConnectionRequestFindManyArgs> = z.object({
  select: ConnectionRequestSelectSchema.optional(),
  include: ConnectionRequestIncludeSchema.optional(),
  where: ConnectionRequestWhereInputSchema.optional(),
  orderBy: z.union([ ConnectionRequestOrderByWithRelationInputSchema.array(),ConnectionRequestOrderByWithRelationInputSchema ]).optional(),
  cursor: ConnectionRequestWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ConnectionRequestScalarFieldEnumSchema,ConnectionRequestScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ConnectionRequestAggregateArgsSchema: z.ZodType<Prisma.ConnectionRequestAggregateArgs> = z.object({
  where: ConnectionRequestWhereInputSchema.optional(),
  orderBy: z.union([ ConnectionRequestOrderByWithRelationInputSchema.array(),ConnectionRequestOrderByWithRelationInputSchema ]).optional(),
  cursor: ConnectionRequestWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ConnectionRequestGroupByArgsSchema: z.ZodType<Prisma.ConnectionRequestGroupByArgs> = z.object({
  where: ConnectionRequestWhereInputSchema.optional(),
  orderBy: z.union([ ConnectionRequestOrderByWithAggregationInputSchema.array(),ConnectionRequestOrderByWithAggregationInputSchema ]).optional(),
  by: ConnectionRequestScalarFieldEnumSchema.array(),
  having: ConnectionRequestScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ConnectionRequestFindUniqueArgsSchema: z.ZodType<Prisma.ConnectionRequestFindUniqueArgs> = z.object({
  select: ConnectionRequestSelectSchema.optional(),
  include: ConnectionRequestIncludeSchema.optional(),
  where: ConnectionRequestWhereUniqueInputSchema,
}).strict() ;

export const ConnectionRequestFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ConnectionRequestFindUniqueOrThrowArgs> = z.object({
  select: ConnectionRequestSelectSchema.optional(),
  include: ConnectionRequestIncludeSchema.optional(),
  where: ConnectionRequestWhereUniqueInputSchema,
}).strict() ;

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

export const DatingProfileFindFirstArgsSchema: z.ZodType<Prisma.DatingProfileFindFirstArgs> = z.object({
  select: DatingProfileSelectSchema.optional(),
  include: DatingProfileIncludeSchema.optional(),
  where: DatingProfileWhereInputSchema.optional(),
  orderBy: z.union([ DatingProfileOrderByWithRelationInputSchema.array(),DatingProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: DatingProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DatingProfileScalarFieldEnumSchema,DatingProfileScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DatingProfileFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DatingProfileFindFirstOrThrowArgs> = z.object({
  select: DatingProfileSelectSchema.optional(),
  include: DatingProfileIncludeSchema.optional(),
  where: DatingProfileWhereInputSchema.optional(),
  orderBy: z.union([ DatingProfileOrderByWithRelationInputSchema.array(),DatingProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: DatingProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DatingProfileScalarFieldEnumSchema,DatingProfileScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DatingProfileFindManyArgsSchema: z.ZodType<Prisma.DatingProfileFindManyArgs> = z.object({
  select: DatingProfileSelectSchema.optional(),
  include: DatingProfileIncludeSchema.optional(),
  where: DatingProfileWhereInputSchema.optional(),
  orderBy: z.union([ DatingProfileOrderByWithRelationInputSchema.array(),DatingProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: DatingProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DatingProfileScalarFieldEnumSchema,DatingProfileScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DatingProfileAggregateArgsSchema: z.ZodType<Prisma.DatingProfileAggregateArgs> = z.object({
  where: DatingProfileWhereInputSchema.optional(),
  orderBy: z.union([ DatingProfileOrderByWithRelationInputSchema.array(),DatingProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: DatingProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DatingProfileGroupByArgsSchema: z.ZodType<Prisma.DatingProfileGroupByArgs> = z.object({
  where: DatingProfileWhereInputSchema.optional(),
  orderBy: z.union([ DatingProfileOrderByWithAggregationInputSchema.array(),DatingProfileOrderByWithAggregationInputSchema ]).optional(),
  by: DatingProfileScalarFieldEnumSchema.array(),
  having: DatingProfileScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DatingProfileFindUniqueArgsSchema: z.ZodType<Prisma.DatingProfileFindUniqueArgs> = z.object({
  select: DatingProfileSelectSchema.optional(),
  include: DatingProfileIncludeSchema.optional(),
  where: DatingProfileWhereUniqueInputSchema,
}).strict() ;

export const DatingProfileFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DatingProfileFindUniqueOrThrowArgs> = z.object({
  select: DatingProfileSelectSchema.optional(),
  include: DatingProfileIncludeSchema.optional(),
  where: DatingProfileWhereUniqueInputSchema,
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

export const DatingProfileTagCreateArgsSchema: z.ZodType<Prisma.DatingProfileTagCreateArgs> = z.object({
  select: DatingProfileTagSelectSchema.optional(),
  include: DatingProfileTagIncludeSchema.optional(),
  data: z.union([ DatingProfileTagCreateInputSchema,DatingProfileTagUncheckedCreateInputSchema ]),
}).strict() ;

export const DatingProfileTagUpsertArgsSchema: z.ZodType<Prisma.DatingProfileTagUpsertArgs> = z.object({
  select: DatingProfileTagSelectSchema.optional(),
  include: DatingProfileTagIncludeSchema.optional(),
  where: DatingProfileTagWhereUniqueInputSchema,
  create: z.union([ DatingProfileTagCreateInputSchema,DatingProfileTagUncheckedCreateInputSchema ]),
  update: z.union([ DatingProfileTagUpdateInputSchema,DatingProfileTagUncheckedUpdateInputSchema ]),
}).strict() ;

export const DatingProfileTagCreateManyArgsSchema: z.ZodType<Prisma.DatingProfileTagCreateManyArgs> = z.object({
  data: z.union([ DatingProfileTagCreateManyInputSchema,DatingProfileTagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const DatingProfileTagCreateManyAndReturnArgsSchema: z.ZodType<Prisma.DatingProfileTagCreateManyAndReturnArgs> = z.object({
  data: z.union([ DatingProfileTagCreateManyInputSchema,DatingProfileTagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const DatingProfileTagDeleteArgsSchema: z.ZodType<Prisma.DatingProfileTagDeleteArgs> = z.object({
  select: DatingProfileTagSelectSchema.optional(),
  include: DatingProfileTagIncludeSchema.optional(),
  where: DatingProfileTagWhereUniqueInputSchema,
}).strict() ;

export const DatingProfileTagUpdateArgsSchema: z.ZodType<Prisma.DatingProfileTagUpdateArgs> = z.object({
  select: DatingProfileTagSelectSchema.optional(),
  include: DatingProfileTagIncludeSchema.optional(),
  data: z.union([ DatingProfileTagUpdateInputSchema,DatingProfileTagUncheckedUpdateInputSchema ]),
  where: DatingProfileTagWhereUniqueInputSchema,
}).strict() ;

export const DatingProfileTagUpdateManyArgsSchema: z.ZodType<Prisma.DatingProfileTagUpdateManyArgs> = z.object({
  data: z.union([ DatingProfileTagUpdateManyMutationInputSchema,DatingProfileTagUncheckedUpdateManyInputSchema ]),
  where: DatingProfileTagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const DatingProfileTagUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.DatingProfileTagUpdateManyAndReturnArgs> = z.object({
  data: z.union([ DatingProfileTagUpdateManyMutationInputSchema,DatingProfileTagUncheckedUpdateManyInputSchema ]),
  where: DatingProfileTagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const DatingProfileTagDeleteManyArgsSchema: z.ZodType<Prisma.DatingProfileTagDeleteManyArgs> = z.object({
  where: DatingProfileTagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const DatingPreferenceCreateArgsSchema: z.ZodType<Prisma.DatingPreferenceCreateArgs> = z.object({
  select: DatingPreferenceSelectSchema.optional(),
  include: DatingPreferenceIncludeSchema.optional(),
  data: z.union([ DatingPreferenceCreateInputSchema,DatingPreferenceUncheckedCreateInputSchema ]),
}).strict() ;

export const DatingPreferenceUpsertArgsSchema: z.ZodType<Prisma.DatingPreferenceUpsertArgs> = z.object({
  select: DatingPreferenceSelectSchema.optional(),
  include: DatingPreferenceIncludeSchema.optional(),
  where: DatingPreferenceWhereUniqueInputSchema,
  create: z.union([ DatingPreferenceCreateInputSchema,DatingPreferenceUncheckedCreateInputSchema ]),
  update: z.union([ DatingPreferenceUpdateInputSchema,DatingPreferenceUncheckedUpdateInputSchema ]),
}).strict() ;

export const DatingPreferenceCreateManyArgsSchema: z.ZodType<Prisma.DatingPreferenceCreateManyArgs> = z.object({
  data: z.union([ DatingPreferenceCreateManyInputSchema,DatingPreferenceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const DatingPreferenceCreateManyAndReturnArgsSchema: z.ZodType<Prisma.DatingPreferenceCreateManyAndReturnArgs> = z.object({
  data: z.union([ DatingPreferenceCreateManyInputSchema,DatingPreferenceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const DatingPreferenceDeleteArgsSchema: z.ZodType<Prisma.DatingPreferenceDeleteArgs> = z.object({
  select: DatingPreferenceSelectSchema.optional(),
  include: DatingPreferenceIncludeSchema.optional(),
  where: DatingPreferenceWhereUniqueInputSchema,
}).strict() ;

export const DatingPreferenceUpdateArgsSchema: z.ZodType<Prisma.DatingPreferenceUpdateArgs> = z.object({
  select: DatingPreferenceSelectSchema.optional(),
  include: DatingPreferenceIncludeSchema.optional(),
  data: z.union([ DatingPreferenceUpdateInputSchema,DatingPreferenceUncheckedUpdateInputSchema ]),
  where: DatingPreferenceWhereUniqueInputSchema,
}).strict() ;

export const DatingPreferenceUpdateManyArgsSchema: z.ZodType<Prisma.DatingPreferenceUpdateManyArgs> = z.object({
  data: z.union([ DatingPreferenceUpdateManyMutationInputSchema,DatingPreferenceUncheckedUpdateManyInputSchema ]),
  where: DatingPreferenceWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const DatingPreferenceUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.DatingPreferenceUpdateManyAndReturnArgs> = z.object({
  data: z.union([ DatingPreferenceUpdateManyMutationInputSchema,DatingPreferenceUncheckedUpdateManyInputSchema ]),
  where: DatingPreferenceWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const DatingPreferenceDeleteManyArgsSchema: z.ZodType<Prisma.DatingPreferenceDeleteManyArgs> = z.object({
  where: DatingPreferenceWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ConnectionRequestCreateArgsSchema: z.ZodType<Prisma.ConnectionRequestCreateArgs> = z.object({
  select: ConnectionRequestSelectSchema.optional(),
  include: ConnectionRequestIncludeSchema.optional(),
  data: z.union([ ConnectionRequestCreateInputSchema,ConnectionRequestUncheckedCreateInputSchema ]),
}).strict() ;

export const ConnectionRequestUpsertArgsSchema: z.ZodType<Prisma.ConnectionRequestUpsertArgs> = z.object({
  select: ConnectionRequestSelectSchema.optional(),
  include: ConnectionRequestIncludeSchema.optional(),
  where: ConnectionRequestWhereUniqueInputSchema,
  create: z.union([ ConnectionRequestCreateInputSchema,ConnectionRequestUncheckedCreateInputSchema ]),
  update: z.union([ ConnectionRequestUpdateInputSchema,ConnectionRequestUncheckedUpdateInputSchema ]),
}).strict() ;

export const ConnectionRequestCreateManyArgsSchema: z.ZodType<Prisma.ConnectionRequestCreateManyArgs> = z.object({
  data: z.union([ ConnectionRequestCreateManyInputSchema,ConnectionRequestCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ConnectionRequestCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ConnectionRequestCreateManyAndReturnArgs> = z.object({
  data: z.union([ ConnectionRequestCreateManyInputSchema,ConnectionRequestCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ConnectionRequestDeleteArgsSchema: z.ZodType<Prisma.ConnectionRequestDeleteArgs> = z.object({
  select: ConnectionRequestSelectSchema.optional(),
  include: ConnectionRequestIncludeSchema.optional(),
  where: ConnectionRequestWhereUniqueInputSchema,
}).strict() ;

export const ConnectionRequestUpdateArgsSchema: z.ZodType<Prisma.ConnectionRequestUpdateArgs> = z.object({
  select: ConnectionRequestSelectSchema.optional(),
  include: ConnectionRequestIncludeSchema.optional(),
  data: z.union([ ConnectionRequestUpdateInputSchema,ConnectionRequestUncheckedUpdateInputSchema ]),
  where: ConnectionRequestWhereUniqueInputSchema,
}).strict() ;

export const ConnectionRequestUpdateManyArgsSchema: z.ZodType<Prisma.ConnectionRequestUpdateManyArgs> = z.object({
  data: z.union([ ConnectionRequestUpdateManyMutationInputSchema,ConnectionRequestUncheckedUpdateManyInputSchema ]),
  where: ConnectionRequestWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ConnectionRequestUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ConnectionRequestUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ConnectionRequestUpdateManyMutationInputSchema,ConnectionRequestUncheckedUpdateManyInputSchema ]),
  where: ConnectionRequestWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ConnectionRequestDeleteManyArgsSchema: z.ZodType<Prisma.ConnectionRequestDeleteManyArgs> = z.object({
  where: ConnectionRequestWhereInputSchema.optional(),
  limit: z.number().optional(),
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

export const DatingProfileCreateArgsSchema: z.ZodType<Prisma.DatingProfileCreateArgs> = z.object({
  select: DatingProfileSelectSchema.optional(),
  include: DatingProfileIncludeSchema.optional(),
  data: z.union([ DatingProfileCreateInputSchema,DatingProfileUncheckedCreateInputSchema ]),
}).strict() ;

export const DatingProfileUpsertArgsSchema: z.ZodType<Prisma.DatingProfileUpsertArgs> = z.object({
  select: DatingProfileSelectSchema.optional(),
  include: DatingProfileIncludeSchema.optional(),
  where: DatingProfileWhereUniqueInputSchema,
  create: z.union([ DatingProfileCreateInputSchema,DatingProfileUncheckedCreateInputSchema ]),
  update: z.union([ DatingProfileUpdateInputSchema,DatingProfileUncheckedUpdateInputSchema ]),
}).strict() ;

export const DatingProfileCreateManyArgsSchema: z.ZodType<Prisma.DatingProfileCreateManyArgs> = z.object({
  data: z.union([ DatingProfileCreateManyInputSchema,DatingProfileCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const DatingProfileCreateManyAndReturnArgsSchema: z.ZodType<Prisma.DatingProfileCreateManyAndReturnArgs> = z.object({
  data: z.union([ DatingProfileCreateManyInputSchema,DatingProfileCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const DatingProfileDeleteArgsSchema: z.ZodType<Prisma.DatingProfileDeleteArgs> = z.object({
  select: DatingProfileSelectSchema.optional(),
  include: DatingProfileIncludeSchema.optional(),
  where: DatingProfileWhereUniqueInputSchema,
}).strict() ;

export const DatingProfileUpdateArgsSchema: z.ZodType<Prisma.DatingProfileUpdateArgs> = z.object({
  select: DatingProfileSelectSchema.optional(),
  include: DatingProfileIncludeSchema.optional(),
  data: z.union([ DatingProfileUpdateInputSchema,DatingProfileUncheckedUpdateInputSchema ]),
  where: DatingProfileWhereUniqueInputSchema,
}).strict() ;

export const DatingProfileUpdateManyArgsSchema: z.ZodType<Prisma.DatingProfileUpdateManyArgs> = z.object({
  data: z.union([ DatingProfileUpdateManyMutationInputSchema,DatingProfileUncheckedUpdateManyInputSchema ]),
  where: DatingProfileWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const DatingProfileUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.DatingProfileUpdateManyAndReturnArgs> = z.object({
  data: z.union([ DatingProfileUpdateManyMutationInputSchema,DatingProfileUncheckedUpdateManyInputSchema ]),
  where: DatingProfileWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const DatingProfileDeleteManyArgsSchema: z.ZodType<Prisma.DatingProfileDeleteManyArgs> = z.object({
  where: DatingProfileWhereInputSchema.optional(),
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
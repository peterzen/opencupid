import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const CityScalarFieldEnumSchema = z.enum(['id','name','country','lat','lon']);

export const TagScalarFieldEnumSchema = z.enum(['id','slug','name','isUserCreated','isApproved','isHidden','isDeleted','createdBy','createdAt','updatedAt']);

export const TagTranslationScalarFieldEnumSchema = z.enum(['id','tagId','locale','name']);

export const ProfileTagScalarFieldEnumSchema = z.enum(['id','tagId','profileId']);

export const DatingPreferenceScalarFieldEnumSchema = z.enum(['userId','prefAgeMin','prefAgeMax','latitude','longitude','prefRadius','prefGender','isLocationActive']);

export const ConnectionRequestScalarFieldEnumSchema = z.enum(['id','fromUserId','toUserId','scope','status','createdAt']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','tokenVersion','loginToken','loginTokenExp','isActive','isBlocked','isRegistrationConfirmed','createdAt','updatedAt','lastLoginAt','language']);

export const ProfileScalarFieldEnumSchema = z.enum(['id','publicName','country','city','introSocial','isSocialActive','isDatingActive','isActive','isReported','isBlocked','userId','languages','introDating','birthday','gender','relationship','hasKids','profileImageId','createdAt','updatedAt']);

export const ProfileImageScalarFieldEnumSchema = z.enum(['id','mimeType','userId','altText','storagePath','url','createdAt','updatedAt','contentHash','isModerated','isFlagged']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const ConnectionTypeSchema = z.enum(['friend','dating']);

export type ConnectionTypeType = `${z.infer<typeof ConnectionTypeSchema>}`

export const ConnectionStatusSchema = z.enum(['pending','accepted','rejected','blocked']);

export type ConnectionStatusType = `${z.infer<typeof ConnectionStatusSchema>}`

export const GenderSchema = z.enum(['male','female','agender','androgynous','bigender','cis_man','cis_woman','genderfluid','genderqueer','gender_nonconforming','hijra','intersex','pangender','transfeminine','trans_man','transmasculine','transsexual','trans_woman','two_spirit','non_binary','other','unspecified']);

export type GenderType = `${z.infer<typeof GenderSchema>}`

export const PronounsSchema = z.enum(['he_him','she_her','they_them','other','unspecified']);

export type PronounsType = `${z.infer<typeof PronounsSchema>}`

export const HasKidsSchema = z.enum(['yes','no','unspecified']);

export type HasKidsType = `${z.infer<typeof HasKidsSchema>}`

export const PreferenceGenderSchema = z.enum(['male','female','non_binary','any']);

export type PreferenceGenderType = `${z.infer<typeof PreferenceGenderSchema>}`

export const RelationshipStatusSchema = z.enum(['single','in_relationship','married','other','unspecified']);

export type RelationshipStatusType = `${z.infer<typeof RelationshipStatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// CITY SCHEMA
/////////////////////////////////////////

export const CitySchema = z.object({
  id: z.number().int(),
  name: z.string(),
  country: z.string(),
  lat: z.number(),
  lon: z.number(),
})

export type City = z.infer<typeof CitySchema>

/////////////////////////////////////////
// TAG SCHEMA
/////////////////////////////////////////

export const TagSchema = z.object({
  id: z.string().cuid(),
  slug: z.string(),
  name: z.string(),
  isUserCreated: z.boolean(),
  isApproved: z.boolean(),
  isHidden: z.boolean(),
  isDeleted: z.boolean(),
  createdBy: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Tag = z.infer<typeof TagSchema>

/////////////////////////////////////////
// TAG TRANSLATION SCHEMA
/////////////////////////////////////////

export const TagTranslationSchema = z.object({
  id: z.number().int(),
  tagId: z.string(),
  locale: z.string(),
  name: z.string(),
})

export type TagTranslation = z.infer<typeof TagTranslationSchema>

/////////////////////////////////////////
// PROFILE TAG SCHEMA
/////////////////////////////////////////

export const ProfileTagSchema = z.object({
  id: z.string().cuid(),
  tagId: z.string(),
  profileId: z.string().nullable(),
})

export type ProfileTag = z.infer<typeof ProfileTagSchema>

/////////////////////////////////////////
// DATING PREFERENCE SCHEMA
/////////////////////////////////////////

export const DatingPreferenceSchema = z.object({
  prefGender: PreferenceGenderSchema,
  userId: z.string(),
  prefAgeMin: z.number().int().nullable(),
  prefAgeMax: z.number().int().nullable(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  prefRadius: z.number().int().nullable(),
  isLocationActive: z.boolean(),
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
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// PROFILE SCHEMA
/////////////////////////////////////////

export const ProfileSchema = z.object({
  gender: GenderSchema.nullable(),
  relationship: RelationshipStatusSchema.nullable(),
  hasKids: HasKidsSchema.nullable(),
  id: z.string().cuid(),
  publicName: z.string(),
  country: z.string(),
  city: z.string(),
  introSocial: z.string(),
  isSocialActive: z.boolean(),
  isDatingActive: z.boolean(),
  isActive: z.boolean(),
  isReported: z.boolean(),
  isBlocked: z.boolean(),
  userId: z.string(),
  languages: z.string().array(),
  introDating: z.string(),
  birthday: z.coerce.date().nullable(),
  profileImageId: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Profile = z.infer<typeof ProfileSchema>

/////////////////////////////////////////
// PROFILE IMAGE SCHEMA
/////////////////////////////////////////

export const ProfileImageSchema = z.object({
  id: z.string().cuid(),
  mimeType: z.string(),
  userId: z.string(),
  altText: z.string(),
  storagePath: z.string(),
  url: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  contentHash: z.string().nullable(),
  isModerated: z.boolean(),
  isFlagged: z.boolean(),
})

export type ProfileImage = z.infer<typeof ProfileImageSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// CITY
//------------------------------------------------------

export const CitySelectSchema: z.ZodType<Prisma.CitySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  country: z.boolean().optional(),
  lat: z.boolean().optional(),
  lon: z.boolean().optional(),
}).strict()

// TAG
//------------------------------------------------------

export const TagIncludeSchema: z.ZodType<Prisma.TagInclude> = z.object({
  translations: z.union([z.boolean(),z.lazy(() => TagTranslationFindManyArgsSchema)]).optional(),
  profileTags: z.union([z.boolean(),z.lazy(() => ProfileTagFindManyArgsSchema)]).optional(),
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
  translations: z.boolean().optional(),
  profileTags: z.boolean().optional(),
}).strict();

export const TagSelectSchema: z.ZodType<Prisma.TagSelect> = z.object({
  id: z.boolean().optional(),
  slug: z.boolean().optional(),
  name: z.boolean().optional(),
  isUserCreated: z.boolean().optional(),
  isApproved: z.boolean().optional(),
  isHidden: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  createdBy: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  translations: z.union([z.boolean(),z.lazy(() => TagTranslationFindManyArgsSchema)]).optional(),
  profileTags: z.union([z.boolean(),z.lazy(() => ProfileTagFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TagCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TAG TRANSLATION
//------------------------------------------------------

export const TagTranslationIncludeSchema: z.ZodType<Prisma.TagTranslationInclude> = z.object({
  tag: z.union([z.boolean(),z.lazy(() => TagArgsSchema)]).optional(),
}).strict()

export const TagTranslationArgsSchema: z.ZodType<Prisma.TagTranslationDefaultArgs> = z.object({
  select: z.lazy(() => TagTranslationSelectSchema).optional(),
  include: z.lazy(() => TagTranslationIncludeSchema).optional(),
}).strict();

export const TagTranslationSelectSchema: z.ZodType<Prisma.TagTranslationSelect> = z.object({
  id: z.boolean().optional(),
  tagId: z.boolean().optional(),
  locale: z.boolean().optional(),
  name: z.boolean().optional(),
  tag: z.union([z.boolean(),z.lazy(() => TagArgsSchema)]).optional(),
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

// DATING PREFERENCE
//------------------------------------------------------

export const DatingPreferenceSelectSchema: z.ZodType<Prisma.DatingPreferenceSelect> = z.object({
  userId: z.boolean().optional(),
  prefAgeMin: z.boolean().optional(),
  prefAgeMax: z.boolean().optional(),
  latitude: z.boolean().optional(),
  longitude: z.boolean().optional(),
  prefRadius: z.boolean().optional(),
  prefGender: z.boolean().optional(),
  isLocationActive: z.boolean().optional(),
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
  profile: z.union([z.boolean(),z.lazy(() => ProfileArgsSchema)]).optional(),
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
  country: z.boolean().optional(),
  city: z.boolean().optional(),
  introSocial: z.boolean().optional(),
  isSocialActive: z.boolean().optional(),
  isDatingActive: z.boolean().optional(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  userId: z.boolean().optional(),
  languages: z.boolean().optional(),
  introDating: z.boolean().optional(),
  birthday: z.boolean().optional(),
  gender: z.boolean().optional(),
  relationship: z.boolean().optional(),
  hasKids: z.boolean().optional(),
  profileImageId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => ProfileTagFindManyArgsSchema)]).optional(),
  profileImage: z.union([z.boolean(),z.lazy(() => ProfileImageArgsSchema)]).optional(),
  otherImages: z.union([z.boolean(),z.lazy(() => ProfileImageFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProfileCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PROFILE IMAGE
//------------------------------------------------------

export const ProfileImageIncludeSchema: z.ZodType<Prisma.ProfileImageInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  primaryForProfile: z.union([z.boolean(),z.lazy(() => ProfileArgsSchema)]).optional(),
  otherForProfiles: z.union([z.boolean(),z.lazy(() => ProfileFindManyArgsSchema)]).optional(),
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
}).strict();

export const ProfileImageSelectSchema: z.ZodType<Prisma.ProfileImageSelect> = z.object({
  id: z.boolean().optional(),
  mimeType: z.boolean().optional(),
  userId: z.boolean().optional(),
  altText: z.boolean().optional(),
  storagePath: z.boolean().optional(),
  url: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  contentHash: z.boolean().optional(),
  isModerated: z.boolean().optional(),
  isFlagged: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  primaryForProfile: z.union([z.boolean(),z.lazy(() => ProfileArgsSchema)]).optional(),
  otherForProfiles: z.union([z.boolean(),z.lazy(() => ProfileFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProfileImageCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const CityWhereInputSchema: z.ZodType<Prisma.CityWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CityWhereInputSchema),z.lazy(() => CityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CityWhereInputSchema),z.lazy(() => CityWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  country: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lat: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  lon: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
}).strict();

export const CityOrderByWithRelationInputSchema: z.ZodType<Prisma.CityOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  lon: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CityWhereUniqueInputSchema: z.ZodType<Prisma.CityWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => CityWhereInputSchema),z.lazy(() => CityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CityWhereInputSchema),z.lazy(() => CityWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  country: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lat: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  lon: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
}).strict());

export const CityOrderByWithAggregationInputSchema: z.ZodType<Prisma.CityOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  lon: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CityCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CityAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CityMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CityMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CitySumOrderByAggregateInputSchema).optional()
}).strict();

export const CityScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CityScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CityScalarWhereWithAggregatesInputSchema),z.lazy(() => CityScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CityScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CityScalarWhereWithAggregatesInputSchema),z.lazy(() => CityScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  country: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  lat: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  lon: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const TagWhereInputSchema: z.ZodType<Prisma.TagWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isUserCreated: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isApproved: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isHidden: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isDeleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdBy: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  translations: z.lazy(() => TagTranslationListRelationFilterSchema).optional(),
  profileTags: z.lazy(() => ProfileTagListRelationFilterSchema).optional()
}).strict();

export const TagOrderByWithRelationInputSchema: z.ZodType<Prisma.TagOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  isUserCreated: z.lazy(() => SortOrderSchema).optional(),
  isApproved: z.lazy(() => SortOrderSchema).optional(),
  isHidden: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  createdBy: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  translations: z.lazy(() => TagTranslationOrderByRelationAggregateInputSchema).optional(),
  profileTags: z.lazy(() => ProfileTagOrderByRelationAggregateInputSchema).optional()
}).strict();

export const TagWhereUniqueInputSchema: z.ZodType<Prisma.TagWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    slug: z.string(),
    name: z.string()
  }),
  z.object({
    id: z.string().cuid(),
    slug: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
    name: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    slug: z.string(),
    name: z.string(),
  }),
  z.object({
    slug: z.string(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  slug: z.string().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  isUserCreated: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isApproved: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isHidden: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isDeleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdBy: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  translations: z.lazy(() => TagTranslationListRelationFilterSchema).optional(),
  profileTags: z.lazy(() => ProfileTagListRelationFilterSchema).optional()
}).strict());

export const TagOrderByWithAggregationInputSchema: z.ZodType<Prisma.TagOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  isUserCreated: z.lazy(() => SortOrderSchema).optional(),
  isApproved: z.lazy(() => SortOrderSchema).optional(),
  isHidden: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  createdBy: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TagCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TagMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TagMinOrderByAggregateInputSchema).optional()
}).strict();

export const TagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TagScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TagScalarWhereWithAggregatesInputSchema),z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagScalarWhereWithAggregatesInputSchema),z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  isUserCreated: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  isApproved: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  isHidden: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  isDeleted: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdBy: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TagTranslationWhereInputSchema: z.ZodType<Prisma.TagTranslationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TagTranslationWhereInputSchema),z.lazy(() => TagTranslationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagTranslationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagTranslationWhereInputSchema),z.lazy(() => TagTranslationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  tagId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  locale: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tag: z.union([ z.lazy(() => TagScalarRelationFilterSchema),z.lazy(() => TagWhereInputSchema) ]).optional(),
}).strict();

export const TagTranslationOrderByWithRelationInputSchema: z.ZodType<Prisma.TagTranslationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional(),
  locale: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  tag: z.lazy(() => TagOrderByWithRelationInputSchema).optional()
}).strict();

export const TagTranslationWhereUniqueInputSchema: z.ZodType<Prisma.TagTranslationWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    tagId_locale: z.lazy(() => TagTranslationTagIdLocaleCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    tagId_locale: z.lazy(() => TagTranslationTagIdLocaleCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  tagId_locale: z.lazy(() => TagTranslationTagIdLocaleCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => TagTranslationWhereInputSchema),z.lazy(() => TagTranslationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagTranslationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagTranslationWhereInputSchema),z.lazy(() => TagTranslationWhereInputSchema).array() ]).optional(),
  tagId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  locale: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tag: z.union([ z.lazy(() => TagScalarRelationFilterSchema),z.lazy(() => TagWhereInputSchema) ]).optional(),
}).strict());

export const TagTranslationOrderByWithAggregationInputSchema: z.ZodType<Prisma.TagTranslationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional(),
  locale: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TagTranslationCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TagTranslationAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TagTranslationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TagTranslationMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TagTranslationSumOrderByAggregateInputSchema).optional()
}).strict();

export const TagTranslationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TagTranslationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TagTranslationScalarWhereWithAggregatesInputSchema),z.lazy(() => TagTranslationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagTranslationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagTranslationScalarWhereWithAggregatesInputSchema),z.lazy(() => TagTranslationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  tagId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  locale: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ProfileTagWhereInputSchema: z.ZodType<Prisma.ProfileTagWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProfileTagWhereInputSchema),z.lazy(() => ProfileTagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfileTagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfileTagWhereInputSchema),z.lazy(() => ProfileTagWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tagId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  profileId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  tag: z.union([ z.lazy(() => TagScalarRelationFilterSchema),z.lazy(() => TagWhereInputSchema) ]).optional(),
  profile: z.union([ z.lazy(() => ProfileNullableScalarRelationFilterSchema),z.lazy(() => ProfileWhereInputSchema) ]).optional().nullable(),
}).strict();

export const ProfileTagOrderByWithRelationInputSchema: z.ZodType<Prisma.ProfileTagOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
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
  tagId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  profileId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  tag: z.union([ z.lazy(() => TagScalarRelationFilterSchema),z.lazy(() => TagWhereInputSchema) ]).optional(),
  profile: z.union([ z.lazy(() => ProfileNullableScalarRelationFilterSchema),z.lazy(() => ProfileWhereInputSchema) ]).optional().nullable(),
}).strict());

export const ProfileTagOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProfileTagOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => ProfileTagCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProfileTagMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProfileTagMinOrderByAggregateInputSchema).optional()
}).strict();

export const ProfileTagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProfileTagScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProfileTagScalarWhereWithAggregatesInputSchema),z.lazy(() => ProfileTagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfileTagScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfileTagScalarWhereWithAggregatesInputSchema),z.lazy(() => ProfileTagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tagId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  profileId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const DatingPreferenceWhereInputSchema: z.ZodType<Prisma.DatingPreferenceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DatingPreferenceWhereInputSchema),z.lazy(() => DatingPreferenceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DatingPreferenceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DatingPreferenceWhereInputSchema),z.lazy(() => DatingPreferenceWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  prefAgeMin: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  prefAgeMax: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  latitude: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  longitude: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  prefRadius: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  prefGender: z.union([ z.lazy(() => EnumPreferenceGenderFilterSchema),z.lazy(() => PreferenceGenderSchema) ]).optional(),
  isLocationActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
}).strict();

export const DatingPreferenceOrderByWithRelationInputSchema: z.ZodType<Prisma.DatingPreferenceOrderByWithRelationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  prefAgeMin: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  prefAgeMax: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  latitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  longitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  prefRadius: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  prefGender: z.lazy(() => SortOrderSchema).optional(),
  isLocationActive: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DatingPreferenceWhereUniqueInputSchema: z.ZodType<Prisma.DatingPreferenceWhereUniqueInput> = z.object({
  userId: z.string()
})
.and(z.object({
  userId: z.string().optional(),
  AND: z.union([ z.lazy(() => DatingPreferenceWhereInputSchema),z.lazy(() => DatingPreferenceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DatingPreferenceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DatingPreferenceWhereInputSchema),z.lazy(() => DatingPreferenceWhereInputSchema).array() ]).optional(),
  prefAgeMin: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  prefAgeMax: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  latitude: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  longitude: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  prefRadius: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  prefGender: z.union([ z.lazy(() => EnumPreferenceGenderFilterSchema),z.lazy(() => PreferenceGenderSchema) ]).optional(),
  isLocationActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
}).strict());

export const DatingPreferenceOrderByWithAggregationInputSchema: z.ZodType<Prisma.DatingPreferenceOrderByWithAggregationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  prefAgeMin: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  prefAgeMax: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  latitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  longitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  prefRadius: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  prefGender: z.lazy(() => SortOrderSchema).optional(),
  isLocationActive: z.lazy(() => SortOrderSchema).optional(),
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
  prefAgeMin: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  prefAgeMax: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  latitude: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  longitude: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  prefRadius: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  prefGender: z.union([ z.lazy(() => EnumPreferenceGenderWithAggregatesFilterSchema),z.lazy(() => PreferenceGenderSchema) ]).optional(),
  isLocationActive: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
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
  profile: z.union([ z.lazy(() => ProfileNullableScalarRelationFilterSchema),z.lazy(() => ProfileWhereInputSchema) ]).optional().nullable(),
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
  profile: z.lazy(() => ProfileOrderByWithRelationInputSchema).optional(),
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
  profile: z.union([ z.lazy(() => ProfileNullableScalarRelationFilterSchema),z.lazy(() => ProfileWhereInputSchema) ]).optional().nullable(),
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
}).strict();

export const ProfileWhereInputSchema: z.ZodType<Prisma.ProfileWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProfileWhereInputSchema),z.lazy(() => ProfileWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfileWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfileWhereInputSchema),z.lazy(() => ProfileWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  publicName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  country: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  introSocial: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isSocialActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isDatingActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isReported: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isBlocked: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  languages: z.lazy(() => StringNullableListFilterSchema).optional(),
  introDating: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  birthday: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  gender: z.union([ z.lazy(() => EnumGenderNullableFilterSchema),z.lazy(() => GenderSchema) ]).optional().nullable(),
  relationship: z.union([ z.lazy(() => EnumRelationshipStatusNullableFilterSchema),z.lazy(() => RelationshipStatusSchema) ]).optional().nullable(),
  hasKids: z.union([ z.lazy(() => EnumHasKidsNullableFilterSchema),z.lazy(() => HasKidsSchema) ]).optional().nullable(),
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
  country: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  introSocial: z.lazy(() => SortOrderSchema).optional(),
  isSocialActive: z.lazy(() => SortOrderSchema).optional(),
  isDatingActive: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  isReported: z.lazy(() => SortOrderSchema).optional(),
  isBlocked: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  languages: z.lazy(() => SortOrderSchema).optional(),
  introDating: z.lazy(() => SortOrderSchema).optional(),
  birthday: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  relationship: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  hasKids: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
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
  country: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  introSocial: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isSocialActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isDatingActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isReported: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isBlocked: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  languages: z.lazy(() => StringNullableListFilterSchema).optional(),
  introDating: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  birthday: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  gender: z.union([ z.lazy(() => EnumGenderNullableFilterSchema),z.lazy(() => GenderSchema) ]).optional().nullable(),
  relationship: z.union([ z.lazy(() => EnumRelationshipStatusNullableFilterSchema),z.lazy(() => RelationshipStatusSchema) ]).optional().nullable(),
  hasKids: z.union([ z.lazy(() => EnumHasKidsNullableFilterSchema),z.lazy(() => HasKidsSchema) ]).optional().nullable(),
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
  country: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  introSocial: z.lazy(() => SortOrderSchema).optional(),
  isSocialActive: z.lazy(() => SortOrderSchema).optional(),
  isDatingActive: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  isReported: z.lazy(() => SortOrderSchema).optional(),
  isBlocked: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  languages: z.lazy(() => SortOrderSchema).optional(),
  introDating: z.lazy(() => SortOrderSchema).optional(),
  birthday: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  relationship: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  hasKids: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
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
  country: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  introSocial: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  isSocialActive: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  isDatingActive: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  isReported: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  isBlocked: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  languages: z.lazy(() => StringNullableListFilterSchema).optional(),
  introDating: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  birthday: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  gender: z.union([ z.lazy(() => EnumGenderNullableWithAggregatesFilterSchema),z.lazy(() => GenderSchema) ]).optional().nullable(),
  relationship: z.union([ z.lazy(() => EnumRelationshipStatusNullableWithAggregatesFilterSchema),z.lazy(() => RelationshipStatusSchema) ]).optional().nullable(),
  hasKids: z.union([ z.lazy(() => EnumHasKidsNullableWithAggregatesFilterSchema),z.lazy(() => HasKidsSchema) ]).optional().nullable(),
  profileImageId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ProfileImageWhereInputSchema: z.ZodType<Prisma.ProfileImageWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProfileImageWhereInputSchema),z.lazy(() => ProfileImageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfileImageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfileImageWhereInputSchema),z.lazy(() => ProfileImageWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  mimeType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  altText: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  storagePath: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  contentHash: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isModerated: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isFlagged: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  primaryForProfile: z.union([ z.lazy(() => ProfileNullableScalarRelationFilterSchema),z.lazy(() => ProfileWhereInputSchema) ]).optional().nullable(),
  otherForProfiles: z.lazy(() => ProfileListRelationFilterSchema).optional()
}).strict();

export const ProfileImageOrderByWithRelationInputSchema: z.ZodType<Prisma.ProfileImageOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  mimeType: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  altText: z.lazy(() => SortOrderSchema).optional(),
  storagePath: z.lazy(() => SortOrderSchema).optional(),
  url: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  contentHash: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isModerated: z.lazy(() => SortOrderSchema).optional(),
  isFlagged: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  primaryForProfile: z.lazy(() => ProfileOrderByWithRelationInputSchema).optional(),
  otherForProfiles: z.lazy(() => ProfileOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ProfileImageWhereUniqueInputSchema: z.ZodType<Prisma.ProfileImageWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    storagePath: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    storagePath: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  storagePath: z.string().optional(),
  AND: z.union([ z.lazy(() => ProfileImageWhereInputSchema),z.lazy(() => ProfileImageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfileImageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfileImageWhereInputSchema),z.lazy(() => ProfileImageWhereInputSchema).array() ]).optional(),
  mimeType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  altText: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  contentHash: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isModerated: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isFlagged: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  primaryForProfile: z.union([ z.lazy(() => ProfileNullableScalarRelationFilterSchema),z.lazy(() => ProfileWhereInputSchema) ]).optional().nullable(),
  otherForProfiles: z.lazy(() => ProfileListRelationFilterSchema).optional()
}).strict());

export const ProfileImageOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProfileImageOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  mimeType: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  altText: z.lazy(() => SortOrderSchema).optional(),
  storagePath: z.lazy(() => SortOrderSchema).optional(),
  url: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  contentHash: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isModerated: z.lazy(() => SortOrderSchema).optional(),
  isFlagged: z.lazy(() => SortOrderSchema).optional(),
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
  altText: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  storagePath: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  contentHash: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  isModerated: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  isFlagged: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const CityCreateInputSchema: z.ZodType<Prisma.CityCreateInput> = z.object({
  id: z.number().int(),
  name: z.string(),
  country: z.string(),
  lat: z.number(),
  lon: z.number()
}).strict();

export const CityUncheckedCreateInputSchema: z.ZodType<Prisma.CityUncheckedCreateInput> = z.object({
  id: z.number().int(),
  name: z.string(),
  country: z.string(),
  lat: z.number(),
  lon: z.number()
}).strict();

export const CityUpdateInputSchema: z.ZodType<Prisma.CityUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  lon: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CityUncheckedUpdateInputSchema: z.ZodType<Prisma.CityUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  lon: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CityCreateManyInputSchema: z.ZodType<Prisma.CityCreateManyInput> = z.object({
  id: z.number().int(),
  name: z.string(),
  country: z.string(),
  lat: z.number(),
  lon: z.number()
}).strict();

export const CityUpdateManyMutationInputSchema: z.ZodType<Prisma.CityUpdateManyMutationInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  lon: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CityUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CityUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  lon: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagCreateInputSchema: z.ZodType<Prisma.TagCreateInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string(),
  isUserCreated: z.boolean().optional(),
  isApproved: z.boolean().optional(),
  isHidden: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  createdBy: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  translations: z.lazy(() => TagTranslationCreateNestedManyWithoutTagInputSchema).optional(),
  profileTags: z.lazy(() => ProfileTagCreateNestedManyWithoutTagInputSchema).optional()
}).strict();

export const TagUncheckedCreateInputSchema: z.ZodType<Prisma.TagUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string(),
  isUserCreated: z.boolean().optional(),
  isApproved: z.boolean().optional(),
  isHidden: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  createdBy: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  translations: z.lazy(() => TagTranslationUncheckedCreateNestedManyWithoutTagInputSchema).optional(),
  profileTags: z.lazy(() => ProfileTagUncheckedCreateNestedManyWithoutTagInputSchema).optional()
}).strict();

export const TagUpdateInputSchema: z.ZodType<Prisma.TagUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isUserCreated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isApproved: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isHidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdBy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  translations: z.lazy(() => TagTranslationUpdateManyWithoutTagNestedInputSchema).optional(),
  profileTags: z.lazy(() => ProfileTagUpdateManyWithoutTagNestedInputSchema).optional()
}).strict();

export const TagUncheckedUpdateInputSchema: z.ZodType<Prisma.TagUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isUserCreated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isApproved: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isHidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdBy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  translations: z.lazy(() => TagTranslationUncheckedUpdateManyWithoutTagNestedInputSchema).optional(),
  profileTags: z.lazy(() => ProfileTagUncheckedUpdateManyWithoutTagNestedInputSchema).optional()
}).strict();

export const TagCreateManyInputSchema: z.ZodType<Prisma.TagCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string(),
  isUserCreated: z.boolean().optional(),
  isApproved: z.boolean().optional(),
  isHidden: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  createdBy: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TagUpdateManyMutationInputSchema: z.ZodType<Prisma.TagUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isUserCreated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isApproved: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isHidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdBy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isUserCreated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isApproved: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isHidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdBy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagTranslationCreateInputSchema: z.ZodType<Prisma.TagTranslationCreateInput> = z.object({
  locale: z.string(),
  name: z.string(),
  tag: z.lazy(() => TagCreateNestedOneWithoutTranslationsInputSchema)
}).strict();

export const TagTranslationUncheckedCreateInputSchema: z.ZodType<Prisma.TagTranslationUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  tagId: z.string(),
  locale: z.string(),
  name: z.string()
}).strict();

export const TagTranslationUpdateInputSchema: z.ZodType<Prisma.TagTranslationUpdateInput> = z.object({
  locale: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tag: z.lazy(() => TagUpdateOneRequiredWithoutTranslationsNestedInputSchema).optional()
}).strict();

export const TagTranslationUncheckedUpdateInputSchema: z.ZodType<Prisma.TagTranslationUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  locale: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagTranslationCreateManyInputSchema: z.ZodType<Prisma.TagTranslationCreateManyInput> = z.object({
  id: z.number().int().optional(),
  tagId: z.string(),
  locale: z.string(),
  name: z.string()
}).strict();

export const TagTranslationUpdateManyMutationInputSchema: z.ZodType<Prisma.TagTranslationUpdateManyMutationInput> = z.object({
  locale: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagTranslationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TagTranslationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  locale: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfileTagCreateInputSchema: z.ZodType<Prisma.ProfileTagCreateInput> = z.object({
  id: z.string().cuid().optional(),
  tag: z.lazy(() => TagCreateNestedOneWithoutProfileTagsInputSchema),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutTagsInputSchema).optional()
}).strict();

export const ProfileTagUncheckedCreateInputSchema: z.ZodType<Prisma.ProfileTagUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  tagId: z.string(),
  profileId: z.string().optional().nullable()
}).strict();

export const ProfileTagUpdateInputSchema: z.ZodType<Prisma.ProfileTagUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tag: z.lazy(() => TagUpdateOneRequiredWithoutProfileTagsNestedInputSchema).optional(),
  profile: z.lazy(() => ProfileUpdateOneWithoutTagsNestedInputSchema).optional()
}).strict();

export const ProfileTagUncheckedUpdateInputSchema: z.ZodType<Prisma.ProfileTagUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ProfileTagCreateManyInputSchema: z.ZodType<Prisma.ProfileTagCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  tagId: z.string(),
  profileId: z.string().optional().nullable()
}).strict();

export const ProfileTagUpdateManyMutationInputSchema: z.ZodType<Prisma.ProfileTagUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfileTagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProfileTagUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const DatingPreferenceCreateInputSchema: z.ZodType<Prisma.DatingPreferenceCreateInput> = z.object({
  userId: z.string(),
  prefAgeMin: z.number().int().optional().nullable(),
  prefAgeMax: z.number().int().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  prefRadius: z.number().int().optional().nullable(),
  prefGender: z.lazy(() => PreferenceGenderSchema).optional(),
  isLocationActive: z.boolean().optional()
}).strict();

export const DatingPreferenceUncheckedCreateInputSchema: z.ZodType<Prisma.DatingPreferenceUncheckedCreateInput> = z.object({
  userId: z.string(),
  prefAgeMin: z.number().int().optional().nullable(),
  prefAgeMax: z.number().int().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  prefRadius: z.number().int().optional().nullable(),
  prefGender: z.lazy(() => PreferenceGenderSchema).optional(),
  isLocationActive: z.boolean().optional()
}).strict();

export const DatingPreferenceUpdateInputSchema: z.ZodType<Prisma.DatingPreferenceUpdateInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prefAgeMin: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  prefAgeMax: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  prefRadius: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  prefGender: z.union([ z.lazy(() => PreferenceGenderSchema),z.lazy(() => EnumPreferenceGenderFieldUpdateOperationsInputSchema) ]).optional(),
  isLocationActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DatingPreferenceUncheckedUpdateInputSchema: z.ZodType<Prisma.DatingPreferenceUncheckedUpdateInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prefAgeMin: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  prefAgeMax: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  prefRadius: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  prefGender: z.union([ z.lazy(() => PreferenceGenderSchema),z.lazy(() => EnumPreferenceGenderFieldUpdateOperationsInputSchema) ]).optional(),
  isLocationActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DatingPreferenceCreateManyInputSchema: z.ZodType<Prisma.DatingPreferenceCreateManyInput> = z.object({
  userId: z.string(),
  prefAgeMin: z.number().int().optional().nullable(),
  prefAgeMax: z.number().int().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  prefRadius: z.number().int().optional().nullable(),
  prefGender: z.lazy(() => PreferenceGenderSchema).optional(),
  isLocationActive: z.boolean().optional()
}).strict();

export const DatingPreferenceUpdateManyMutationInputSchema: z.ZodType<Prisma.DatingPreferenceUpdateManyMutationInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prefAgeMin: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  prefAgeMax: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  prefRadius: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  prefGender: z.union([ z.lazy(() => PreferenceGenderSchema),z.lazy(() => EnumPreferenceGenderFieldUpdateOperationsInputSchema) ]).optional(),
  isLocationActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DatingPreferenceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DatingPreferenceUncheckedUpdateManyInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prefAgeMin: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  prefAgeMax: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  prefRadius: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  prefGender: z.union([ z.lazy(() => PreferenceGenderSchema),z.lazy(() => EnumPreferenceGenderFieldUpdateOperationsInputSchema) ]).optional(),
  isLocationActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
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
  profile: z.lazy(() => ProfileCreateNestedOneWithoutUserInputSchema).optional(),
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
  profile: z.lazy(() => ProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
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
  profile: z.lazy(() => ProfileUpdateOneWithoutUserNestedInputSchema).optional(),
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
  profile: z.lazy(() => ProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
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
  language: z.string().optional().nullable()
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
}).strict();

export const ProfileCreateInputSchema: z.ZodType<Prisma.ProfileCreateInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  introSocial: z.string().optional(),
  isSocialActive: z.boolean().optional(),
  isDatingActive: z.boolean().optional(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  languages: z.union([ z.lazy(() => ProfileCreatelanguagesInputSchema),z.string().array() ]).optional(),
  introDating: z.string().optional(),
  birthday: z.coerce.date().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional().nullable(),
  relationship: z.lazy(() => RelationshipStatusSchema).optional().nullable(),
  hasKids: z.lazy(() => HasKidsSchema).optional().nullable(),
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
  country: z.string().optional(),
  city: z.string().optional(),
  introSocial: z.string().optional(),
  isSocialActive: z.boolean().optional(),
  isDatingActive: z.boolean().optional(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  userId: z.string(),
  languages: z.union([ z.lazy(() => ProfileCreatelanguagesInputSchema),z.string().array() ]).optional(),
  introDating: z.string().optional(),
  birthday: z.coerce.date().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional().nullable(),
  relationship: z.lazy(() => RelationshipStatusSchema).optional().nullable(),
  hasKids: z.lazy(() => HasKidsSchema).optional().nullable(),
  profileImageId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tags: z.lazy(() => ProfileTagUncheckedCreateNestedManyWithoutProfileInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageUncheckedCreateNestedManyWithoutOtherForProfilesInputSchema).optional()
}).strict();

export const ProfileUpdateInputSchema: z.ZodType<Prisma.ProfileUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  introSocial: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isSocialActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isDatingActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  languages: z.union([ z.lazy(() => ProfileUpdatelanguagesInputSchema),z.string().array() ]).optional(),
  introDating: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NullableEnumGenderFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  relationship: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => NullableEnumRelationshipStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hasKids: z.union([ z.lazy(() => HasKidsSchema),z.lazy(() => NullableEnumHasKidsFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  introSocial: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isSocialActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isDatingActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  languages: z.union([ z.lazy(() => ProfileUpdatelanguagesInputSchema),z.string().array() ]).optional(),
  introDating: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NullableEnumGenderFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  relationship: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => NullableEnumRelationshipStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hasKids: z.union([ z.lazy(() => HasKidsSchema),z.lazy(() => NullableEnumHasKidsFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => ProfileTagUncheckedUpdateManyWithoutProfileNestedInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageUncheckedUpdateManyWithoutOtherForProfilesNestedInputSchema).optional()
}).strict();

export const ProfileCreateManyInputSchema: z.ZodType<Prisma.ProfileCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  introSocial: z.string().optional(),
  isSocialActive: z.boolean().optional(),
  isDatingActive: z.boolean().optional(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  userId: z.string(),
  languages: z.union([ z.lazy(() => ProfileCreatelanguagesInputSchema),z.string().array() ]).optional(),
  introDating: z.string().optional(),
  birthday: z.coerce.date().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional().nullable(),
  relationship: z.lazy(() => RelationshipStatusSchema).optional().nullable(),
  hasKids: z.lazy(() => HasKidsSchema).optional().nullable(),
  profileImageId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ProfileUpdateManyMutationInputSchema: z.ZodType<Prisma.ProfileUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  introSocial: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isSocialActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isDatingActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  languages: z.union([ z.lazy(() => ProfileUpdatelanguagesInputSchema),z.string().array() ]).optional(),
  introDating: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NullableEnumGenderFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  relationship: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => NullableEnumRelationshipStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hasKids: z.union([ z.lazy(() => HasKidsSchema),z.lazy(() => NullableEnumHasKidsFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfileUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  introSocial: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isSocialActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isDatingActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  languages: z.union([ z.lazy(() => ProfileUpdatelanguagesInputSchema),z.string().array() ]).optional(),
  introDating: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NullableEnumGenderFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  relationship: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => NullableEnumRelationshipStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hasKids: z.union([ z.lazy(() => HasKidsSchema),z.lazy(() => NullableEnumHasKidsFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfileImageCreateInputSchema: z.ZodType<Prisma.ProfileImageCreateInput> = z.object({
  id: z.string().cuid().optional(),
  mimeType: z.string(),
  altText: z.string().optional(),
  storagePath: z.string(),
  url: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  contentHash: z.string().optional().nullable(),
  isModerated: z.boolean().optional(),
  isFlagged: z.boolean().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutProfileImageInputSchema),
  primaryForProfile: z.lazy(() => ProfileCreateNestedOneWithoutProfileImageInputSchema).optional(),
  otherForProfiles: z.lazy(() => ProfileCreateNestedManyWithoutOtherImagesInputSchema).optional()
}).strict();

export const ProfileImageUncheckedCreateInputSchema: z.ZodType<Prisma.ProfileImageUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  mimeType: z.string(),
  userId: z.string(),
  altText: z.string().optional(),
  storagePath: z.string(),
  url: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  contentHash: z.string().optional().nullable(),
  isModerated: z.boolean().optional(),
  isFlagged: z.boolean().optional(),
  primaryForProfile: z.lazy(() => ProfileUncheckedCreateNestedOneWithoutProfileImageInputSchema).optional(),
  otherForProfiles: z.lazy(() => ProfileUncheckedCreateNestedManyWithoutOtherImagesInputSchema).optional()
}).strict();

export const ProfileImageUpdateInputSchema: z.ZodType<Prisma.ProfileImageUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  altText: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  storagePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  contentHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isModerated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isFlagged: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutProfileImageNestedInputSchema).optional(),
  primaryForProfile: z.lazy(() => ProfileUpdateOneWithoutProfileImageNestedInputSchema).optional(),
  otherForProfiles: z.lazy(() => ProfileUpdateManyWithoutOtherImagesNestedInputSchema).optional()
}).strict();

export const ProfileImageUncheckedUpdateInputSchema: z.ZodType<Prisma.ProfileImageUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  altText: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  storagePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  contentHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isModerated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isFlagged: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  primaryForProfile: z.lazy(() => ProfileUncheckedUpdateOneWithoutProfileImageNestedInputSchema).optional(),
  otherForProfiles: z.lazy(() => ProfileUncheckedUpdateManyWithoutOtherImagesNestedInputSchema).optional()
}).strict();

export const ProfileImageCreateManyInputSchema: z.ZodType<Prisma.ProfileImageCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  mimeType: z.string(),
  userId: z.string(),
  altText: z.string().optional(),
  storagePath: z.string(),
  url: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  contentHash: z.string().optional().nullable(),
  isModerated: z.boolean().optional(),
  isFlagged: z.boolean().optional()
}).strict();

export const ProfileImageUpdateManyMutationInputSchema: z.ZodType<Prisma.ProfileImageUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  altText: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  storagePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  contentHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isModerated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isFlagged: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfileImageUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProfileImageUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  altText: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  storagePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  contentHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isModerated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isFlagged: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
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

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const CityCountOrderByAggregateInputSchema: z.ZodType<Prisma.CityCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  lon: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CityAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CityAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  lon: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CityMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CityMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  lon: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CityMinOrderByAggregateInputSchema: z.ZodType<Prisma.CityMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  lon: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CitySumOrderByAggregateInputSchema: z.ZodType<Prisma.CitySumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  lon: z.lazy(() => SortOrderSchema).optional()
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

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
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

export const TagTranslationListRelationFilterSchema: z.ZodType<Prisma.TagTranslationListRelationFilter> = z.object({
  every: z.lazy(() => TagTranslationWhereInputSchema).optional(),
  some: z.lazy(() => TagTranslationWhereInputSchema).optional(),
  none: z.lazy(() => TagTranslationWhereInputSchema).optional()
}).strict();

export const ProfileTagListRelationFilterSchema: z.ZodType<Prisma.ProfileTagListRelationFilter> = z.object({
  every: z.lazy(() => ProfileTagWhereInputSchema).optional(),
  some: z.lazy(() => ProfileTagWhereInputSchema).optional(),
  none: z.lazy(() => ProfileTagWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const TagTranslationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TagTranslationOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileTagOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ProfileTagOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagCountOrderByAggregateInputSchema: z.ZodType<Prisma.TagCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  isUserCreated: z.lazy(() => SortOrderSchema).optional(),
  isApproved: z.lazy(() => SortOrderSchema).optional(),
  isHidden: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  createdBy: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TagMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  isUserCreated: z.lazy(() => SortOrderSchema).optional(),
  isApproved: z.lazy(() => SortOrderSchema).optional(),
  isHidden: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  createdBy: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagMinOrderByAggregateInputSchema: z.ZodType<Prisma.TagMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  isUserCreated: z.lazy(() => SortOrderSchema).optional(),
  isApproved: z.lazy(() => SortOrderSchema).optional(),
  isHidden: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  createdBy: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
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

export const TagTranslationTagIdLocaleCompoundUniqueInputSchema: z.ZodType<Prisma.TagTranslationTagIdLocaleCompoundUniqueInput> = z.object({
  tagId: z.string(),
  locale: z.string()
}).strict();

export const TagTranslationCountOrderByAggregateInputSchema: z.ZodType<Prisma.TagTranslationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional(),
  locale: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagTranslationAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TagTranslationAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagTranslationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TagTranslationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional(),
  locale: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagTranslationMinOrderByAggregateInputSchema: z.ZodType<Prisma.TagTranslationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional(),
  locale: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagTranslationSumOrderByAggregateInputSchema: z.ZodType<Prisma.TagTranslationSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileNullableScalarRelationFilterSchema: z.ZodType<Prisma.ProfileNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => ProfileWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ProfileWhereInputSchema).optional().nullable()
}).strict();

export const ProfileTagProfileIdTagIdCompoundUniqueInputSchema: z.ZodType<Prisma.ProfileTagProfileIdTagIdCompoundUniqueInput> = z.object({
  profileId: z.string(),
  tagId: z.string()
}).strict();

export const ProfileTagCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileTagCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional()
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

export const EnumPreferenceGenderFilterSchema: z.ZodType<Prisma.EnumPreferenceGenderFilter> = z.object({
  equals: z.lazy(() => PreferenceGenderSchema).optional(),
  in: z.lazy(() => PreferenceGenderSchema).array().optional(),
  notIn: z.lazy(() => PreferenceGenderSchema).array().optional(),
  not: z.union([ z.lazy(() => PreferenceGenderSchema),z.lazy(() => NestedEnumPreferenceGenderFilterSchema) ]).optional(),
}).strict();

export const DatingPreferenceCountOrderByAggregateInputSchema: z.ZodType<Prisma.DatingPreferenceCountOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  prefAgeMin: z.lazy(() => SortOrderSchema).optional(),
  prefAgeMax: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  prefRadius: z.lazy(() => SortOrderSchema).optional(),
  prefGender: z.lazy(() => SortOrderSchema).optional(),
  isLocationActive: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DatingPreferenceAvgOrderByAggregateInputSchema: z.ZodType<Prisma.DatingPreferenceAvgOrderByAggregateInput> = z.object({
  prefAgeMin: z.lazy(() => SortOrderSchema).optional(),
  prefAgeMax: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  prefRadius: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DatingPreferenceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DatingPreferenceMaxOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  prefAgeMin: z.lazy(() => SortOrderSchema).optional(),
  prefAgeMax: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  prefRadius: z.lazy(() => SortOrderSchema).optional(),
  prefGender: z.lazy(() => SortOrderSchema).optional(),
  isLocationActive: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DatingPreferenceMinOrderByAggregateInputSchema: z.ZodType<Prisma.DatingPreferenceMinOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  prefAgeMin: z.lazy(() => SortOrderSchema).optional(),
  prefAgeMax: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  prefRadius: z.lazy(() => SortOrderSchema).optional(),
  prefGender: z.lazy(() => SortOrderSchema).optional(),
  isLocationActive: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DatingPreferenceSumOrderByAggregateInputSchema: z.ZodType<Prisma.DatingPreferenceSumOrderByAggregateInput> = z.object({
  prefAgeMin: z.lazy(() => SortOrderSchema).optional(),
  prefAgeMax: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  prefRadius: z.lazy(() => SortOrderSchema).optional()
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

export const EnumPreferenceGenderWithAggregatesFilterSchema: z.ZodType<Prisma.EnumPreferenceGenderWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PreferenceGenderSchema).optional(),
  in: z.lazy(() => PreferenceGenderSchema).array().optional(),
  notIn: z.lazy(() => PreferenceGenderSchema).array().optional(),
  not: z.union([ z.lazy(() => PreferenceGenderSchema),z.lazy(() => NestedEnumPreferenceGenderWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPreferenceGenderFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPreferenceGenderFilterSchema).optional()
}).strict();

export const EnumConnectionTypeFilterSchema: z.ZodType<Prisma.EnumConnectionTypeFilter> = z.object({
  equals: z.lazy(() => ConnectionTypeSchema).optional(),
  in: z.lazy(() => ConnectionTypeSchema).array().optional(),
  notIn: z.lazy(() => ConnectionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ConnectionTypeSchema),z.lazy(() => NestedEnumConnectionTypeFilterSchema) ]).optional(),
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

export const EnumConnectionTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumConnectionTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ConnectionTypeSchema).optional(),
  in: z.lazy(() => ConnectionTypeSchema).array().optional(),
  notIn: z.lazy(() => ConnectionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ConnectionTypeSchema),z.lazy(() => NestedEnumConnectionTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumConnectionTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumConnectionTypeFilterSchema).optional()
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
  language: z.lazy(() => SortOrderSchema).optional()
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
  isActive: z.lazy(() => SortOrderSchema).optional(),
  isBlocked: z.lazy(() => SortOrderSchema).optional(),
  isRegistrationConfirmed: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  lastLoginAt: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional()
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
  language: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> = z.object({
  tokenVersion: z.lazy(() => SortOrderSchema).optional()
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

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> = z.object({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const EnumGenderNullableFilterSchema: z.ZodType<Prisma.EnumGenderNullableFilter> = z.object({
  equals: z.lazy(() => GenderSchema).optional().nullable(),
  in: z.lazy(() => GenderSchema).array().optional().nullable(),
  notIn: z.lazy(() => GenderSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NestedEnumGenderNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const EnumRelationshipStatusNullableFilterSchema: z.ZodType<Prisma.EnumRelationshipStatusNullableFilter> = z.object({
  equals: z.lazy(() => RelationshipStatusSchema).optional().nullable(),
  in: z.lazy(() => RelationshipStatusSchema).array().optional().nullable(),
  notIn: z.lazy(() => RelationshipStatusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => NestedEnumRelationshipStatusNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const EnumHasKidsNullableFilterSchema: z.ZodType<Prisma.EnumHasKidsNullableFilter> = z.object({
  equals: z.lazy(() => HasKidsSchema).optional().nullable(),
  in: z.lazy(() => HasKidsSchema).array().optional().nullable(),
  notIn: z.lazy(() => HasKidsSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => HasKidsSchema),z.lazy(() => NestedEnumHasKidsNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const ProfileImageNullableScalarRelationFilterSchema: z.ZodType<Prisma.ProfileImageNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => ProfileImageWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ProfileImageWhereInputSchema).optional().nullable()
}).strict();

export const ProfileCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  publicName: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  introSocial: z.lazy(() => SortOrderSchema).optional(),
  isSocialActive: z.lazy(() => SortOrderSchema).optional(),
  isDatingActive: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  isReported: z.lazy(() => SortOrderSchema).optional(),
  isBlocked: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  languages: z.lazy(() => SortOrderSchema).optional(),
  introDating: z.lazy(() => SortOrderSchema).optional(),
  birthday: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  relationship: z.lazy(() => SortOrderSchema).optional(),
  hasKids: z.lazy(() => SortOrderSchema).optional(),
  profileImageId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  publicName: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  introSocial: z.lazy(() => SortOrderSchema).optional(),
  isSocialActive: z.lazy(() => SortOrderSchema).optional(),
  isDatingActive: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  isReported: z.lazy(() => SortOrderSchema).optional(),
  isBlocked: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  introDating: z.lazy(() => SortOrderSchema).optional(),
  birthday: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  relationship: z.lazy(() => SortOrderSchema).optional(),
  hasKids: z.lazy(() => SortOrderSchema).optional(),
  profileImageId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  publicName: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  introSocial: z.lazy(() => SortOrderSchema).optional(),
  isSocialActive: z.lazy(() => SortOrderSchema).optional(),
  isDatingActive: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  isReported: z.lazy(() => SortOrderSchema).optional(),
  isBlocked: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  introDating: z.lazy(() => SortOrderSchema).optional(),
  birthday: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  relationship: z.lazy(() => SortOrderSchema).optional(),
  hasKids: z.lazy(() => SortOrderSchema).optional(),
  profileImageId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumGenderNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumGenderNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => GenderSchema).optional().nullable(),
  in: z.lazy(() => GenderSchema).array().optional().nullable(),
  notIn: z.lazy(() => GenderSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NestedEnumGenderNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumGenderNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumGenderNullableFilterSchema).optional()
}).strict();

export const EnumRelationshipStatusNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRelationshipStatusNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RelationshipStatusSchema).optional().nullable(),
  in: z.lazy(() => RelationshipStatusSchema).array().optional().nullable(),
  notIn: z.lazy(() => RelationshipStatusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => NestedEnumRelationshipStatusNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRelationshipStatusNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRelationshipStatusNullableFilterSchema).optional()
}).strict();

export const EnumHasKidsNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumHasKidsNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => HasKidsSchema).optional().nullable(),
  in: z.lazy(() => HasKidsSchema).array().optional().nullable(),
  notIn: z.lazy(() => HasKidsSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => HasKidsSchema),z.lazy(() => NestedEnumHasKidsNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumHasKidsNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumHasKidsNullableFilterSchema).optional()
}).strict();

export const ProfileListRelationFilterSchema: z.ZodType<Prisma.ProfileListRelationFilter> = z.object({
  every: z.lazy(() => ProfileWhereInputSchema).optional(),
  some: z.lazy(() => ProfileWhereInputSchema).optional(),
  none: z.lazy(() => ProfileWhereInputSchema).optional()
}).strict();

export const ProfileOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ProfileOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileImageCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileImageCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  mimeType: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  altText: z.lazy(() => SortOrderSchema).optional(),
  storagePath: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  contentHash: z.lazy(() => SortOrderSchema).optional(),
  isModerated: z.lazy(() => SortOrderSchema).optional(),
  isFlagged: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileImageMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileImageMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  mimeType: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  altText: z.lazy(() => SortOrderSchema).optional(),
  storagePath: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  contentHash: z.lazy(() => SortOrderSchema).optional(),
  isModerated: z.lazy(() => SortOrderSchema).optional(),
  isFlagged: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileImageMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileImageMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  mimeType: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  altText: z.lazy(() => SortOrderSchema).optional(),
  storagePath: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  contentHash: z.lazy(() => SortOrderSchema).optional(),
  isModerated: z.lazy(() => SortOrderSchema).optional(),
  isFlagged: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const TagTranslationCreateNestedManyWithoutTagInputSchema: z.ZodType<Prisma.TagTranslationCreateNestedManyWithoutTagInput> = z.object({
  create: z.union([ z.lazy(() => TagTranslationCreateWithoutTagInputSchema),z.lazy(() => TagTranslationCreateWithoutTagInputSchema).array(),z.lazy(() => TagTranslationUncheckedCreateWithoutTagInputSchema),z.lazy(() => TagTranslationUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TagTranslationCreateOrConnectWithoutTagInputSchema),z.lazy(() => TagTranslationCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TagTranslationCreateManyTagInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TagTranslationWhereUniqueInputSchema),z.lazy(() => TagTranslationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProfileTagCreateNestedManyWithoutTagInputSchema: z.ZodType<Prisma.ProfileTagCreateNestedManyWithoutTagInput> = z.object({
  create: z.union([ z.lazy(() => ProfileTagCreateWithoutTagInputSchema),z.lazy(() => ProfileTagCreateWithoutTagInputSchema).array(),z.lazy(() => ProfileTagUncheckedCreateWithoutTagInputSchema),z.lazy(() => ProfileTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfileTagCreateOrConnectWithoutTagInputSchema),z.lazy(() => ProfileTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProfileTagCreateManyTagInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProfileTagWhereUniqueInputSchema),z.lazy(() => ProfileTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TagTranslationUncheckedCreateNestedManyWithoutTagInputSchema: z.ZodType<Prisma.TagTranslationUncheckedCreateNestedManyWithoutTagInput> = z.object({
  create: z.union([ z.lazy(() => TagTranslationCreateWithoutTagInputSchema),z.lazy(() => TagTranslationCreateWithoutTagInputSchema).array(),z.lazy(() => TagTranslationUncheckedCreateWithoutTagInputSchema),z.lazy(() => TagTranslationUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TagTranslationCreateOrConnectWithoutTagInputSchema),z.lazy(() => TagTranslationCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TagTranslationCreateManyTagInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TagTranslationWhereUniqueInputSchema),z.lazy(() => TagTranslationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProfileTagUncheckedCreateNestedManyWithoutTagInputSchema: z.ZodType<Prisma.ProfileTagUncheckedCreateNestedManyWithoutTagInput> = z.object({
  create: z.union([ z.lazy(() => ProfileTagCreateWithoutTagInputSchema),z.lazy(() => ProfileTagCreateWithoutTagInputSchema).array(),z.lazy(() => ProfileTagUncheckedCreateWithoutTagInputSchema),z.lazy(() => ProfileTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProfileTagCreateOrConnectWithoutTagInputSchema),z.lazy(() => ProfileTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProfileTagCreateManyTagInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProfileTagWhereUniqueInputSchema),z.lazy(() => ProfileTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const TagTranslationUpdateManyWithoutTagNestedInputSchema: z.ZodType<Prisma.TagTranslationUpdateManyWithoutTagNestedInput> = z.object({
  create: z.union([ z.lazy(() => TagTranslationCreateWithoutTagInputSchema),z.lazy(() => TagTranslationCreateWithoutTagInputSchema).array(),z.lazy(() => TagTranslationUncheckedCreateWithoutTagInputSchema),z.lazy(() => TagTranslationUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TagTranslationCreateOrConnectWithoutTagInputSchema),z.lazy(() => TagTranslationCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TagTranslationUpsertWithWhereUniqueWithoutTagInputSchema),z.lazy(() => TagTranslationUpsertWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TagTranslationCreateManyTagInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TagTranslationWhereUniqueInputSchema),z.lazy(() => TagTranslationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TagTranslationWhereUniqueInputSchema),z.lazy(() => TagTranslationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TagTranslationWhereUniqueInputSchema),z.lazy(() => TagTranslationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TagTranslationWhereUniqueInputSchema),z.lazy(() => TagTranslationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TagTranslationUpdateWithWhereUniqueWithoutTagInputSchema),z.lazy(() => TagTranslationUpdateWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TagTranslationUpdateManyWithWhereWithoutTagInputSchema),z.lazy(() => TagTranslationUpdateManyWithWhereWithoutTagInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TagTranslationScalarWhereInputSchema),z.lazy(() => TagTranslationScalarWhereInputSchema).array() ]).optional(),
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

export const TagTranslationUncheckedUpdateManyWithoutTagNestedInputSchema: z.ZodType<Prisma.TagTranslationUncheckedUpdateManyWithoutTagNestedInput> = z.object({
  create: z.union([ z.lazy(() => TagTranslationCreateWithoutTagInputSchema),z.lazy(() => TagTranslationCreateWithoutTagInputSchema).array(),z.lazy(() => TagTranslationUncheckedCreateWithoutTagInputSchema),z.lazy(() => TagTranslationUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TagTranslationCreateOrConnectWithoutTagInputSchema),z.lazy(() => TagTranslationCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TagTranslationUpsertWithWhereUniqueWithoutTagInputSchema),z.lazy(() => TagTranslationUpsertWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TagTranslationCreateManyTagInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TagTranslationWhereUniqueInputSchema),z.lazy(() => TagTranslationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TagTranslationWhereUniqueInputSchema),z.lazy(() => TagTranslationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TagTranslationWhereUniqueInputSchema),z.lazy(() => TagTranslationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TagTranslationWhereUniqueInputSchema),z.lazy(() => TagTranslationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TagTranslationUpdateWithWhereUniqueWithoutTagInputSchema),z.lazy(() => TagTranslationUpdateWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TagTranslationUpdateManyWithWhereWithoutTagInputSchema),z.lazy(() => TagTranslationUpdateManyWithWhereWithoutTagInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TagTranslationScalarWhereInputSchema),z.lazy(() => TagTranslationScalarWhereInputSchema).array() ]).optional(),
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

export const TagCreateNestedOneWithoutTranslationsInputSchema: z.ZodType<Prisma.TagCreateNestedOneWithoutTranslationsInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutTranslationsInputSchema),z.lazy(() => TagUncheckedCreateWithoutTranslationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TagCreateOrConnectWithoutTranslationsInputSchema).optional(),
  connect: z.lazy(() => TagWhereUniqueInputSchema).optional()
}).strict();

export const TagUpdateOneRequiredWithoutTranslationsNestedInputSchema: z.ZodType<Prisma.TagUpdateOneRequiredWithoutTranslationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutTranslationsInputSchema),z.lazy(() => TagUncheckedCreateWithoutTranslationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TagCreateOrConnectWithoutTranslationsInputSchema).optional(),
  upsert: z.lazy(() => TagUpsertWithoutTranslationsInputSchema).optional(),
  connect: z.lazy(() => TagWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TagUpdateToOneWithWhereWithoutTranslationsInputSchema),z.lazy(() => TagUpdateWithoutTranslationsInputSchema),z.lazy(() => TagUncheckedUpdateWithoutTranslationsInputSchema) ]).optional(),
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

export const ProfileUpdateOneWithoutTagsNestedInputSchema: z.ZodType<Prisma.ProfileUpdateOneWithoutTagsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutTagsInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutTagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutTagsInputSchema).optional(),
  upsert: z.lazy(() => ProfileUpsertWithoutTagsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProfileUpdateToOneWithWhereWithoutTagsInputSchema),z.lazy(() => ProfileUpdateWithoutTagsInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutTagsInputSchema) ]).optional(),
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const EnumPreferenceGenderFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumPreferenceGenderFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => PreferenceGenderSchema).optional()
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

export const EnumConnectionTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumConnectionTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ConnectionTypeSchema).optional()
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

export const ProfileCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.ProfileCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutUserInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional()
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

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
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

export const ProfileCreatelanguagesInputSchema: z.ZodType<Prisma.ProfileCreatelanguagesInput> = z.object({
  set: z.string().array()
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

export const ProfileUpdatelanguagesInputSchema: z.ZodType<Prisma.ProfileUpdatelanguagesInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const NullableEnumGenderFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumGenderFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => GenderSchema).optional().nullable()
}).strict();

export const NullableEnumRelationshipStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumRelationshipStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => RelationshipStatusSchema).optional().nullable()
}).strict();

export const NullableEnumHasKidsFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumHasKidsFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => HasKidsSchema).optional().nullable()
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

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
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

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
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

export const NestedEnumPreferenceGenderFilterSchema: z.ZodType<Prisma.NestedEnumPreferenceGenderFilter> = z.object({
  equals: z.lazy(() => PreferenceGenderSchema).optional(),
  in: z.lazy(() => PreferenceGenderSchema).array().optional(),
  notIn: z.lazy(() => PreferenceGenderSchema).array().optional(),
  not: z.union([ z.lazy(() => PreferenceGenderSchema),z.lazy(() => NestedEnumPreferenceGenderFilterSchema) ]).optional(),
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

export const NestedEnumPreferenceGenderWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumPreferenceGenderWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PreferenceGenderSchema).optional(),
  in: z.lazy(() => PreferenceGenderSchema).array().optional(),
  notIn: z.lazy(() => PreferenceGenderSchema).array().optional(),
  not: z.union([ z.lazy(() => PreferenceGenderSchema),z.lazy(() => NestedEnumPreferenceGenderWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPreferenceGenderFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPreferenceGenderFilterSchema).optional()
}).strict();

export const NestedEnumConnectionTypeFilterSchema: z.ZodType<Prisma.NestedEnumConnectionTypeFilter> = z.object({
  equals: z.lazy(() => ConnectionTypeSchema).optional(),
  in: z.lazy(() => ConnectionTypeSchema).array().optional(),
  notIn: z.lazy(() => ConnectionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ConnectionTypeSchema),z.lazy(() => NestedEnumConnectionTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumConnectionStatusFilterSchema: z.ZodType<Prisma.NestedEnumConnectionStatusFilter> = z.object({
  equals: z.lazy(() => ConnectionStatusSchema).optional(),
  in: z.lazy(() => ConnectionStatusSchema).array().optional(),
  notIn: z.lazy(() => ConnectionStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ConnectionStatusSchema),z.lazy(() => NestedEnumConnectionStatusFilterSchema) ]).optional(),
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

export const NestedEnumConnectionStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumConnectionStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ConnectionStatusSchema).optional(),
  in: z.lazy(() => ConnectionStatusSchema).array().optional(),
  notIn: z.lazy(() => ConnectionStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ConnectionStatusSchema),z.lazy(() => NestedEnumConnectionStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumConnectionStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumConnectionStatusFilterSchema).optional()
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

export const NestedEnumGenderNullableFilterSchema: z.ZodType<Prisma.NestedEnumGenderNullableFilter> = z.object({
  equals: z.lazy(() => GenderSchema).optional().nullable(),
  in: z.lazy(() => GenderSchema).array().optional().nullable(),
  notIn: z.lazy(() => GenderSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NestedEnumGenderNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumRelationshipStatusNullableFilterSchema: z.ZodType<Prisma.NestedEnumRelationshipStatusNullableFilter> = z.object({
  equals: z.lazy(() => RelationshipStatusSchema).optional().nullable(),
  in: z.lazy(() => RelationshipStatusSchema).array().optional().nullable(),
  notIn: z.lazy(() => RelationshipStatusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => NestedEnumRelationshipStatusNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumHasKidsNullableFilterSchema: z.ZodType<Prisma.NestedEnumHasKidsNullableFilter> = z.object({
  equals: z.lazy(() => HasKidsSchema).optional().nullable(),
  in: z.lazy(() => HasKidsSchema).array().optional().nullable(),
  notIn: z.lazy(() => HasKidsSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => HasKidsSchema),z.lazy(() => NestedEnumHasKidsNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumGenderNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumGenderNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => GenderSchema).optional().nullable(),
  in: z.lazy(() => GenderSchema).array().optional().nullable(),
  notIn: z.lazy(() => GenderSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NestedEnumGenderNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumGenderNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumGenderNullableFilterSchema).optional()
}).strict();

export const NestedEnumRelationshipStatusNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRelationshipStatusNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RelationshipStatusSchema).optional().nullable(),
  in: z.lazy(() => RelationshipStatusSchema).array().optional().nullable(),
  notIn: z.lazy(() => RelationshipStatusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => NestedEnumRelationshipStatusNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRelationshipStatusNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRelationshipStatusNullableFilterSchema).optional()
}).strict();

export const NestedEnumHasKidsNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumHasKidsNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => HasKidsSchema).optional().nullable(),
  in: z.lazy(() => HasKidsSchema).array().optional().nullable(),
  notIn: z.lazy(() => HasKidsSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => HasKidsSchema),z.lazy(() => NestedEnumHasKidsNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumHasKidsNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumHasKidsNullableFilterSchema).optional()
}).strict();

export const TagTranslationCreateWithoutTagInputSchema: z.ZodType<Prisma.TagTranslationCreateWithoutTagInput> = z.object({
  locale: z.string(),
  name: z.string()
}).strict();

export const TagTranslationUncheckedCreateWithoutTagInputSchema: z.ZodType<Prisma.TagTranslationUncheckedCreateWithoutTagInput> = z.object({
  id: z.number().int().optional(),
  locale: z.string(),
  name: z.string()
}).strict();

export const TagTranslationCreateOrConnectWithoutTagInputSchema: z.ZodType<Prisma.TagTranslationCreateOrConnectWithoutTagInput> = z.object({
  where: z.lazy(() => TagTranslationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TagTranslationCreateWithoutTagInputSchema),z.lazy(() => TagTranslationUncheckedCreateWithoutTagInputSchema) ]),
}).strict();

export const TagTranslationCreateManyTagInputEnvelopeSchema: z.ZodType<Prisma.TagTranslationCreateManyTagInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TagTranslationCreateManyTagInputSchema),z.lazy(() => TagTranslationCreateManyTagInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ProfileTagCreateWithoutTagInputSchema: z.ZodType<Prisma.ProfileTagCreateWithoutTagInput> = z.object({
  id: z.string().cuid().optional(),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutTagsInputSchema).optional()
}).strict();

export const ProfileTagUncheckedCreateWithoutTagInputSchema: z.ZodType<Prisma.ProfileTagUncheckedCreateWithoutTagInput> = z.object({
  id: z.string().cuid().optional(),
  profileId: z.string().optional().nullable()
}).strict();

export const ProfileTagCreateOrConnectWithoutTagInputSchema: z.ZodType<Prisma.ProfileTagCreateOrConnectWithoutTagInput> = z.object({
  where: z.lazy(() => ProfileTagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProfileTagCreateWithoutTagInputSchema),z.lazy(() => ProfileTagUncheckedCreateWithoutTagInputSchema) ]),
}).strict();

export const ProfileTagCreateManyTagInputEnvelopeSchema: z.ZodType<Prisma.ProfileTagCreateManyTagInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ProfileTagCreateManyTagInputSchema),z.lazy(() => ProfileTagCreateManyTagInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TagTranslationUpsertWithWhereUniqueWithoutTagInputSchema: z.ZodType<Prisma.TagTranslationUpsertWithWhereUniqueWithoutTagInput> = z.object({
  where: z.lazy(() => TagTranslationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TagTranslationUpdateWithoutTagInputSchema),z.lazy(() => TagTranslationUncheckedUpdateWithoutTagInputSchema) ]),
  create: z.union([ z.lazy(() => TagTranslationCreateWithoutTagInputSchema),z.lazy(() => TagTranslationUncheckedCreateWithoutTagInputSchema) ]),
}).strict();

export const TagTranslationUpdateWithWhereUniqueWithoutTagInputSchema: z.ZodType<Prisma.TagTranslationUpdateWithWhereUniqueWithoutTagInput> = z.object({
  where: z.lazy(() => TagTranslationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TagTranslationUpdateWithoutTagInputSchema),z.lazy(() => TagTranslationUncheckedUpdateWithoutTagInputSchema) ]),
}).strict();

export const TagTranslationUpdateManyWithWhereWithoutTagInputSchema: z.ZodType<Prisma.TagTranslationUpdateManyWithWhereWithoutTagInput> = z.object({
  where: z.lazy(() => TagTranslationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TagTranslationUpdateManyMutationInputSchema),z.lazy(() => TagTranslationUncheckedUpdateManyWithoutTagInputSchema) ]),
}).strict();

export const TagTranslationScalarWhereInputSchema: z.ZodType<Prisma.TagTranslationScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TagTranslationScalarWhereInputSchema),z.lazy(() => TagTranslationScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagTranslationScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagTranslationScalarWhereInputSchema),z.lazy(() => TagTranslationScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  tagId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  locale: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
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
  tagId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  profileId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const TagCreateWithoutTranslationsInputSchema: z.ZodType<Prisma.TagCreateWithoutTranslationsInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string(),
  isUserCreated: z.boolean().optional(),
  isApproved: z.boolean().optional(),
  isHidden: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  createdBy: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  profileTags: z.lazy(() => ProfileTagCreateNestedManyWithoutTagInputSchema).optional()
}).strict();

export const TagUncheckedCreateWithoutTranslationsInputSchema: z.ZodType<Prisma.TagUncheckedCreateWithoutTranslationsInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string(),
  isUserCreated: z.boolean().optional(),
  isApproved: z.boolean().optional(),
  isHidden: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  createdBy: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  profileTags: z.lazy(() => ProfileTagUncheckedCreateNestedManyWithoutTagInputSchema).optional()
}).strict();

export const TagCreateOrConnectWithoutTranslationsInputSchema: z.ZodType<Prisma.TagCreateOrConnectWithoutTranslationsInput> = z.object({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TagCreateWithoutTranslationsInputSchema),z.lazy(() => TagUncheckedCreateWithoutTranslationsInputSchema) ]),
}).strict();

export const TagUpsertWithoutTranslationsInputSchema: z.ZodType<Prisma.TagUpsertWithoutTranslationsInput> = z.object({
  update: z.union([ z.lazy(() => TagUpdateWithoutTranslationsInputSchema),z.lazy(() => TagUncheckedUpdateWithoutTranslationsInputSchema) ]),
  create: z.union([ z.lazy(() => TagCreateWithoutTranslationsInputSchema),z.lazy(() => TagUncheckedCreateWithoutTranslationsInputSchema) ]),
  where: z.lazy(() => TagWhereInputSchema).optional()
}).strict();

export const TagUpdateToOneWithWhereWithoutTranslationsInputSchema: z.ZodType<Prisma.TagUpdateToOneWithWhereWithoutTranslationsInput> = z.object({
  where: z.lazy(() => TagWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TagUpdateWithoutTranslationsInputSchema),z.lazy(() => TagUncheckedUpdateWithoutTranslationsInputSchema) ]),
}).strict();

export const TagUpdateWithoutTranslationsInputSchema: z.ZodType<Prisma.TagUpdateWithoutTranslationsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isUserCreated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isApproved: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isHidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdBy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  profileTags: z.lazy(() => ProfileTagUpdateManyWithoutTagNestedInputSchema).optional()
}).strict();

export const TagUncheckedUpdateWithoutTranslationsInputSchema: z.ZodType<Prisma.TagUncheckedUpdateWithoutTranslationsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isUserCreated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isApproved: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isHidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdBy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  profileTags: z.lazy(() => ProfileTagUncheckedUpdateManyWithoutTagNestedInputSchema).optional()
}).strict();

export const TagCreateWithoutProfileTagsInputSchema: z.ZodType<Prisma.TagCreateWithoutProfileTagsInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string(),
  isUserCreated: z.boolean().optional(),
  isApproved: z.boolean().optional(),
  isHidden: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  createdBy: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  translations: z.lazy(() => TagTranslationCreateNestedManyWithoutTagInputSchema).optional()
}).strict();

export const TagUncheckedCreateWithoutProfileTagsInputSchema: z.ZodType<Prisma.TagUncheckedCreateWithoutProfileTagsInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string(),
  isUserCreated: z.boolean().optional(),
  isApproved: z.boolean().optional(),
  isHidden: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  createdBy: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  translations: z.lazy(() => TagTranslationUncheckedCreateNestedManyWithoutTagInputSchema).optional()
}).strict();

export const TagCreateOrConnectWithoutProfileTagsInputSchema: z.ZodType<Prisma.TagCreateOrConnectWithoutProfileTagsInput> = z.object({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TagCreateWithoutProfileTagsInputSchema),z.lazy(() => TagUncheckedCreateWithoutProfileTagsInputSchema) ]),
}).strict();

export const ProfileCreateWithoutTagsInputSchema: z.ZodType<Prisma.ProfileCreateWithoutTagsInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  introSocial: z.string().optional(),
  isSocialActive: z.boolean().optional(),
  isDatingActive: z.boolean().optional(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  languages: z.union([ z.lazy(() => ProfileCreatelanguagesInputSchema),z.string().array() ]).optional(),
  introDating: z.string().optional(),
  birthday: z.coerce.date().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional().nullable(),
  relationship: z.lazy(() => RelationshipStatusSchema).optional().nullable(),
  hasKids: z.lazy(() => HasKidsSchema).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutProfileInputSchema),
  profileImage: z.lazy(() => ProfileImageCreateNestedOneWithoutPrimaryForProfileInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageCreateNestedManyWithoutOtherForProfilesInputSchema).optional()
}).strict();

export const ProfileUncheckedCreateWithoutTagsInputSchema: z.ZodType<Prisma.ProfileUncheckedCreateWithoutTagsInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  introSocial: z.string().optional(),
  isSocialActive: z.boolean().optional(),
  isDatingActive: z.boolean().optional(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  userId: z.string(),
  languages: z.union([ z.lazy(() => ProfileCreatelanguagesInputSchema),z.string().array() ]).optional(),
  introDating: z.string().optional(),
  birthday: z.coerce.date().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional().nullable(),
  relationship: z.lazy(() => RelationshipStatusSchema).optional().nullable(),
  hasKids: z.lazy(() => HasKidsSchema).optional().nullable(),
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
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isUserCreated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isApproved: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isHidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdBy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  translations: z.lazy(() => TagTranslationUpdateManyWithoutTagNestedInputSchema).optional()
}).strict();

export const TagUncheckedUpdateWithoutProfileTagsInputSchema: z.ZodType<Prisma.TagUncheckedUpdateWithoutProfileTagsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isUserCreated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isApproved: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isHidden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdBy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  translations: z.lazy(() => TagTranslationUncheckedUpdateManyWithoutTagNestedInputSchema).optional()
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
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  introSocial: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isSocialActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isDatingActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  languages: z.union([ z.lazy(() => ProfileUpdatelanguagesInputSchema),z.string().array() ]).optional(),
  introDating: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NullableEnumGenderFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  relationship: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => NullableEnumRelationshipStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hasKids: z.union([ z.lazy(() => HasKidsSchema),z.lazy(() => NullableEnumHasKidsFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutProfileNestedInputSchema).optional(),
  profileImage: z.lazy(() => ProfileImageUpdateOneWithoutPrimaryForProfileNestedInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageUpdateManyWithoutOtherForProfilesNestedInputSchema).optional()
}).strict();

export const ProfileUncheckedUpdateWithoutTagsInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateWithoutTagsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  introSocial: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isSocialActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isDatingActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  languages: z.union([ z.lazy(() => ProfileUpdatelanguagesInputSchema),z.string().array() ]).optional(),
  introDating: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NullableEnumGenderFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  relationship: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => NullableEnumRelationshipStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hasKids: z.union([ z.lazy(() => HasKidsSchema),z.lazy(() => NullableEnumHasKidsFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  otherImages: z.lazy(() => ProfileImageUncheckedUpdateManyWithoutOtherForProfilesNestedInputSchema).optional()
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
  profile: z.lazy(() => ProfileCreateNestedOneWithoutUserInputSchema).optional(),
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
  profile: z.lazy(() => ProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
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
  profile: z.lazy(() => ProfileCreateNestedOneWithoutUserInputSchema).optional(),
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
  profile: z.lazy(() => ProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
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
  profile: z.lazy(() => ProfileUpdateOneWithoutUserNestedInputSchema).optional(),
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
  profile: z.lazy(() => ProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
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
  profile: z.lazy(() => ProfileUpdateOneWithoutUserNestedInputSchema).optional(),
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
  profile: z.lazy(() => ProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  ProfileImage: z.lazy(() => ProfileImageUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  requestsSent: z.lazy(() => ConnectionRequestUncheckedUpdateManyWithoutFromUserNestedInputSchema).optional()
}).strict();

export const ProfileCreateWithoutUserInputSchema: z.ZodType<Prisma.ProfileCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  introSocial: z.string().optional(),
  isSocialActive: z.boolean().optional(),
  isDatingActive: z.boolean().optional(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  languages: z.union([ z.lazy(() => ProfileCreatelanguagesInputSchema),z.string().array() ]).optional(),
  introDating: z.string().optional(),
  birthday: z.coerce.date().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional().nullable(),
  relationship: z.lazy(() => RelationshipStatusSchema).optional().nullable(),
  hasKids: z.lazy(() => HasKidsSchema).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tags: z.lazy(() => ProfileTagCreateNestedManyWithoutProfileInputSchema).optional(),
  profileImage: z.lazy(() => ProfileImageCreateNestedOneWithoutPrimaryForProfileInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageCreateNestedManyWithoutOtherForProfilesInputSchema).optional()
}).strict();

export const ProfileUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ProfileUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  introSocial: z.string().optional(),
  isSocialActive: z.boolean().optional(),
  isDatingActive: z.boolean().optional(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  languages: z.union([ z.lazy(() => ProfileCreatelanguagesInputSchema),z.string().array() ]).optional(),
  introDating: z.string().optional(),
  birthday: z.coerce.date().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional().nullable(),
  relationship: z.lazy(() => RelationshipStatusSchema).optional().nullable(),
  hasKids: z.lazy(() => HasKidsSchema).optional().nullable(),
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

export const ProfileImageCreateWithoutUserInputSchema: z.ZodType<Prisma.ProfileImageCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  mimeType: z.string(),
  altText: z.string().optional(),
  storagePath: z.string(),
  url: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  contentHash: z.string().optional().nullable(),
  isModerated: z.boolean().optional(),
  isFlagged: z.boolean().optional(),
  primaryForProfile: z.lazy(() => ProfileCreateNestedOneWithoutProfileImageInputSchema).optional(),
  otherForProfiles: z.lazy(() => ProfileCreateNestedManyWithoutOtherImagesInputSchema).optional()
}).strict();

export const ProfileImageUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ProfileImageUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  mimeType: z.string(),
  altText: z.string().optional(),
  storagePath: z.string(),
  url: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  contentHash: z.string().optional().nullable(),
  isModerated: z.boolean().optional(),
  isFlagged: z.boolean().optional(),
  primaryForProfile: z.lazy(() => ProfileUncheckedCreateNestedOneWithoutProfileImageInputSchema).optional(),
  otherForProfiles: z.lazy(() => ProfileUncheckedCreateNestedManyWithoutOtherImagesInputSchema).optional()
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
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  introSocial: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isSocialActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isDatingActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  languages: z.union([ z.lazy(() => ProfileUpdatelanguagesInputSchema),z.string().array() ]).optional(),
  introDating: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NullableEnumGenderFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  relationship: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => NullableEnumRelationshipStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hasKids: z.union([ z.lazy(() => HasKidsSchema),z.lazy(() => NullableEnumHasKidsFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => ProfileTagUpdateManyWithoutProfileNestedInputSchema).optional(),
  profileImage: z.lazy(() => ProfileImageUpdateOneWithoutPrimaryForProfileNestedInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageUpdateManyWithoutOtherForProfilesNestedInputSchema).optional()
}).strict();

export const ProfileUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  introSocial: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isSocialActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isDatingActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  languages: z.union([ z.lazy(() => ProfileUpdatelanguagesInputSchema),z.string().array() ]).optional(),
  introDating: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NullableEnumGenderFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  relationship: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => NullableEnumRelationshipStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hasKids: z.union([ z.lazy(() => HasKidsSchema),z.lazy(() => NullableEnumHasKidsFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => ProfileTagUncheckedUpdateManyWithoutProfileNestedInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageUncheckedUpdateManyWithoutOtherForProfilesNestedInputSchema).optional()
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
  altText: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  storagePath: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  contentHash: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isModerated: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isFlagged: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
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

export const ProfileImageCreateWithoutPrimaryForProfileInputSchema: z.ZodType<Prisma.ProfileImageCreateWithoutPrimaryForProfileInput> = z.object({
  id: z.string().cuid().optional(),
  mimeType: z.string(),
  altText: z.string().optional(),
  storagePath: z.string(),
  url: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  contentHash: z.string().optional().nullable(),
  isModerated: z.boolean().optional(),
  isFlagged: z.boolean().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutProfileImageInputSchema),
  otherForProfiles: z.lazy(() => ProfileCreateNestedManyWithoutOtherImagesInputSchema).optional()
}).strict();

export const ProfileImageUncheckedCreateWithoutPrimaryForProfileInputSchema: z.ZodType<Prisma.ProfileImageUncheckedCreateWithoutPrimaryForProfileInput> = z.object({
  id: z.string().cuid().optional(),
  mimeType: z.string(),
  userId: z.string(),
  altText: z.string().optional(),
  storagePath: z.string(),
  url: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  contentHash: z.string().optional().nullable(),
  isModerated: z.boolean().optional(),
  isFlagged: z.boolean().optional(),
  otherForProfiles: z.lazy(() => ProfileUncheckedCreateNestedManyWithoutOtherImagesInputSchema).optional()
}).strict();

export const ProfileImageCreateOrConnectWithoutPrimaryForProfileInputSchema: z.ZodType<Prisma.ProfileImageCreateOrConnectWithoutPrimaryForProfileInput> = z.object({
  where: z.lazy(() => ProfileImageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProfileImageCreateWithoutPrimaryForProfileInputSchema),z.lazy(() => ProfileImageUncheckedCreateWithoutPrimaryForProfileInputSchema) ]),
}).strict();

export const ProfileImageCreateWithoutOtherForProfilesInputSchema: z.ZodType<Prisma.ProfileImageCreateWithoutOtherForProfilesInput> = z.object({
  id: z.string().cuid().optional(),
  mimeType: z.string(),
  altText: z.string().optional(),
  storagePath: z.string(),
  url: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  contentHash: z.string().optional().nullable(),
  isModerated: z.boolean().optional(),
  isFlagged: z.boolean().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutProfileImageInputSchema),
  primaryForProfile: z.lazy(() => ProfileCreateNestedOneWithoutProfileImageInputSchema).optional()
}).strict();

export const ProfileImageUncheckedCreateWithoutOtherForProfilesInputSchema: z.ZodType<Prisma.ProfileImageUncheckedCreateWithoutOtherForProfilesInput> = z.object({
  id: z.string().cuid().optional(),
  mimeType: z.string(),
  userId: z.string(),
  altText: z.string().optional(),
  storagePath: z.string(),
  url: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  contentHash: z.string().optional().nullable(),
  isModerated: z.boolean().optional(),
  isFlagged: z.boolean().optional(),
  primaryForProfile: z.lazy(() => ProfileUncheckedCreateNestedOneWithoutProfileImageInputSchema).optional()
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
  altText: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  storagePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  contentHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isModerated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isFlagged: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutProfileImageNestedInputSchema).optional(),
  otherForProfiles: z.lazy(() => ProfileUpdateManyWithoutOtherImagesNestedInputSchema).optional()
}).strict();

export const ProfileImageUncheckedUpdateWithoutPrimaryForProfileInputSchema: z.ZodType<Prisma.ProfileImageUncheckedUpdateWithoutPrimaryForProfileInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  altText: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  storagePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  contentHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isModerated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isFlagged: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  otherForProfiles: z.lazy(() => ProfileUncheckedUpdateManyWithoutOtherImagesNestedInputSchema).optional()
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
  profile: z.lazy(() => ProfileCreateNestedOneWithoutUserInputSchema).optional(),
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
  profile: z.lazy(() => ProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
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
  country: z.string().optional(),
  city: z.string().optional(),
  introSocial: z.string().optional(),
  isSocialActive: z.boolean().optional(),
  isDatingActive: z.boolean().optional(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  languages: z.union([ z.lazy(() => ProfileCreatelanguagesInputSchema),z.string().array() ]).optional(),
  introDating: z.string().optional(),
  birthday: z.coerce.date().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional().nullable(),
  relationship: z.lazy(() => RelationshipStatusSchema).optional().nullable(),
  hasKids: z.lazy(() => HasKidsSchema).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutProfileInputSchema),
  tags: z.lazy(() => ProfileTagCreateNestedManyWithoutProfileInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageCreateNestedManyWithoutOtherForProfilesInputSchema).optional()
}).strict();

export const ProfileUncheckedCreateWithoutProfileImageInputSchema: z.ZodType<Prisma.ProfileUncheckedCreateWithoutProfileImageInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  introSocial: z.string().optional(),
  isSocialActive: z.boolean().optional(),
  isDatingActive: z.boolean().optional(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  userId: z.string(),
  languages: z.union([ z.lazy(() => ProfileCreatelanguagesInputSchema),z.string().array() ]).optional(),
  introDating: z.string().optional(),
  birthday: z.coerce.date().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional().nullable(),
  relationship: z.lazy(() => RelationshipStatusSchema).optional().nullable(),
  hasKids: z.lazy(() => HasKidsSchema).optional().nullable(),
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
  country: z.string().optional(),
  city: z.string().optional(),
  introSocial: z.string().optional(),
  isSocialActive: z.boolean().optional(),
  isDatingActive: z.boolean().optional(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  languages: z.union([ z.lazy(() => ProfileCreatelanguagesInputSchema),z.string().array() ]).optional(),
  introDating: z.string().optional(),
  birthday: z.coerce.date().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional().nullable(),
  relationship: z.lazy(() => RelationshipStatusSchema).optional().nullable(),
  hasKids: z.lazy(() => HasKidsSchema).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutProfileInputSchema),
  tags: z.lazy(() => ProfileTagCreateNestedManyWithoutProfileInputSchema).optional(),
  profileImage: z.lazy(() => ProfileImageCreateNestedOneWithoutPrimaryForProfileInputSchema).optional()
}).strict();

export const ProfileUncheckedCreateWithoutOtherImagesInputSchema: z.ZodType<Prisma.ProfileUncheckedCreateWithoutOtherImagesInput> = z.object({
  id: z.string().cuid().optional(),
  publicName: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  introSocial: z.string().optional(),
  isSocialActive: z.boolean().optional(),
  isDatingActive: z.boolean().optional(),
  isActive: z.boolean().optional(),
  isReported: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  userId: z.string(),
  languages: z.union([ z.lazy(() => ProfileCreatelanguagesInputSchema),z.string().array() ]).optional(),
  introDating: z.string().optional(),
  birthday: z.coerce.date().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional().nullable(),
  relationship: z.lazy(() => RelationshipStatusSchema).optional().nullable(),
  hasKids: z.lazy(() => HasKidsSchema).optional().nullable(),
  profileImageId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tags: z.lazy(() => ProfileTagUncheckedCreateNestedManyWithoutProfileInputSchema).optional()
}).strict();

export const ProfileCreateOrConnectWithoutOtherImagesInputSchema: z.ZodType<Prisma.ProfileCreateOrConnectWithoutOtherImagesInput> = z.object({
  where: z.lazy(() => ProfileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProfileCreateWithoutOtherImagesInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutOtherImagesInputSchema) ]),
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
  profile: z.lazy(() => ProfileUpdateOneWithoutUserNestedInputSchema).optional(),
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
  profile: z.lazy(() => ProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
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
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  introSocial: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isSocialActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isDatingActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  languages: z.union([ z.lazy(() => ProfileUpdatelanguagesInputSchema),z.string().array() ]).optional(),
  introDating: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NullableEnumGenderFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  relationship: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => NullableEnumRelationshipStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hasKids: z.union([ z.lazy(() => HasKidsSchema),z.lazy(() => NullableEnumHasKidsFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutProfileNestedInputSchema).optional(),
  tags: z.lazy(() => ProfileTagUpdateManyWithoutProfileNestedInputSchema).optional(),
  otherImages: z.lazy(() => ProfileImageUpdateManyWithoutOtherForProfilesNestedInputSchema).optional()
}).strict();

export const ProfileUncheckedUpdateWithoutProfileImageInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateWithoutProfileImageInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  introSocial: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isSocialActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isDatingActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  languages: z.union([ z.lazy(() => ProfileUpdatelanguagesInputSchema),z.string().array() ]).optional(),
  introDating: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NullableEnumGenderFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  relationship: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => NullableEnumRelationshipStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hasKids: z.union([ z.lazy(() => HasKidsSchema),z.lazy(() => NullableEnumHasKidsFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  country: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  introSocial: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isSocialActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isDatingActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isReported: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isBlocked: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  languages: z.lazy(() => StringNullableListFilterSchema).optional(),
  introDating: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  birthday: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  gender: z.union([ z.lazy(() => EnumGenderNullableFilterSchema),z.lazy(() => GenderSchema) ]).optional().nullable(),
  relationship: z.union([ z.lazy(() => EnumRelationshipStatusNullableFilterSchema),z.lazy(() => RelationshipStatusSchema) ]).optional().nullable(),
  hasKids: z.union([ z.lazy(() => EnumHasKidsNullableFilterSchema),z.lazy(() => HasKidsSchema) ]).optional().nullable(),
  profileImageId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TagTranslationCreateManyTagInputSchema: z.ZodType<Prisma.TagTranslationCreateManyTagInput> = z.object({
  id: z.number().int().optional(),
  locale: z.string(),
  name: z.string()
}).strict();

export const ProfileTagCreateManyTagInputSchema: z.ZodType<Prisma.ProfileTagCreateManyTagInput> = z.object({
  id: z.string().cuid().optional(),
  profileId: z.string().optional().nullable()
}).strict();

export const TagTranslationUpdateWithoutTagInputSchema: z.ZodType<Prisma.TagTranslationUpdateWithoutTagInput> = z.object({
  locale: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagTranslationUncheckedUpdateWithoutTagInputSchema: z.ZodType<Prisma.TagTranslationUncheckedUpdateWithoutTagInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  locale: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagTranslationUncheckedUpdateManyWithoutTagInputSchema: z.ZodType<Prisma.TagTranslationUncheckedUpdateManyWithoutTagInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  locale: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfileTagUpdateWithoutTagInputSchema: z.ZodType<Prisma.ProfileTagUpdateWithoutTagInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profile: z.lazy(() => ProfileUpdateOneWithoutTagsNestedInputSchema).optional()
}).strict();

export const ProfileTagUncheckedUpdateWithoutTagInputSchema: z.ZodType<Prisma.ProfileTagUncheckedUpdateWithoutTagInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ProfileTagUncheckedUpdateManyWithoutTagInputSchema: z.ZodType<Prisma.ProfileTagUncheckedUpdateManyWithoutTagInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ProfileImageCreateManyUserInputSchema: z.ZodType<Prisma.ProfileImageCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  mimeType: z.string(),
  altText: z.string().optional(),
  storagePath: z.string(),
  url: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  contentHash: z.string().optional().nullable(),
  isModerated: z.boolean().optional(),
  isFlagged: z.boolean().optional()
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
  altText: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  storagePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  contentHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isModerated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isFlagged: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  primaryForProfile: z.lazy(() => ProfileUpdateOneWithoutProfileImageNestedInputSchema).optional(),
  otherForProfiles: z.lazy(() => ProfileUpdateManyWithoutOtherImagesNestedInputSchema).optional()
}).strict();

export const ProfileImageUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ProfileImageUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  altText: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  storagePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  contentHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isModerated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isFlagged: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  primaryForProfile: z.lazy(() => ProfileUncheckedUpdateOneWithoutProfileImageNestedInputSchema).optional(),
  otherForProfiles: z.lazy(() => ProfileUncheckedUpdateManyWithoutOtherImagesNestedInputSchema).optional()
}).strict();

export const ProfileImageUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.ProfileImageUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  altText: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  storagePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  contentHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isModerated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isFlagged: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
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
  tagId: z.string()
}).strict();

export const ProfileTagUpdateWithoutProfileInputSchema: z.ZodType<Prisma.ProfileTagUpdateWithoutProfileInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tag: z.lazy(() => TagUpdateOneRequiredWithoutProfileTagsNestedInputSchema).optional()
}).strict();

export const ProfileTagUncheckedUpdateWithoutProfileInputSchema: z.ZodType<Prisma.ProfileTagUncheckedUpdateWithoutProfileInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfileTagUncheckedUpdateManyWithoutProfileInputSchema: z.ZodType<Prisma.ProfileTagUncheckedUpdateManyWithoutProfileInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfileImageUpdateWithoutOtherForProfilesInputSchema: z.ZodType<Prisma.ProfileImageUpdateWithoutOtherForProfilesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  altText: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  storagePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  contentHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isModerated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isFlagged: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutProfileImageNestedInputSchema).optional(),
  primaryForProfile: z.lazy(() => ProfileUpdateOneWithoutProfileImageNestedInputSchema).optional()
}).strict();

export const ProfileImageUncheckedUpdateWithoutOtherForProfilesInputSchema: z.ZodType<Prisma.ProfileImageUncheckedUpdateWithoutOtherForProfilesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  altText: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  storagePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  contentHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isModerated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isFlagged: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  primaryForProfile: z.lazy(() => ProfileUncheckedUpdateOneWithoutProfileImageNestedInputSchema).optional()
}).strict();

export const ProfileImageUncheckedUpdateManyWithoutOtherForProfilesInputSchema: z.ZodType<Prisma.ProfileImageUncheckedUpdateManyWithoutOtherForProfilesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  altText: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  storagePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  contentHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isModerated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isFlagged: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfileUpdateWithoutOtherImagesInputSchema: z.ZodType<Prisma.ProfileUpdateWithoutOtherImagesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  introSocial: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isSocialActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isDatingActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  languages: z.union([ z.lazy(() => ProfileUpdatelanguagesInputSchema),z.string().array() ]).optional(),
  introDating: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NullableEnumGenderFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  relationship: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => NullableEnumRelationshipStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hasKids: z.union([ z.lazy(() => HasKidsSchema),z.lazy(() => NullableEnumHasKidsFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutProfileNestedInputSchema).optional(),
  tags: z.lazy(() => ProfileTagUpdateManyWithoutProfileNestedInputSchema).optional(),
  profileImage: z.lazy(() => ProfileImageUpdateOneWithoutPrimaryForProfileNestedInputSchema).optional()
}).strict();

export const ProfileUncheckedUpdateWithoutOtherImagesInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateWithoutOtherImagesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  introSocial: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isSocialActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isDatingActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  languages: z.union([ z.lazy(() => ProfileUpdatelanguagesInputSchema),z.string().array() ]).optional(),
  introDating: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NullableEnumGenderFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  relationship: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => NullableEnumRelationshipStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hasKids: z.union([ z.lazy(() => HasKidsSchema),z.lazy(() => NullableEnumHasKidsFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => ProfileTagUncheckedUpdateManyWithoutProfileNestedInputSchema).optional()
}).strict();

export const ProfileUncheckedUpdateManyWithoutOtherImagesInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateManyWithoutOtherImagesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publicName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  introSocial: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isSocialActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isDatingActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isReported: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isBlocked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  languages: z.union([ z.lazy(() => ProfileUpdatelanguagesInputSchema),z.string().array() ]).optional(),
  introDating: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NullableEnumGenderFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  relationship: z.union([ z.lazy(() => RelationshipStatusSchema),z.lazy(() => NullableEnumRelationshipStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hasKids: z.union([ z.lazy(() => HasKidsSchema),z.lazy(() => NullableEnumHasKidsFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileImageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const CityFindFirstArgsSchema: z.ZodType<Prisma.CityFindFirstArgs> = z.object({
  select: CitySelectSchema.optional(),
  where: CityWhereInputSchema.optional(),
  orderBy: z.union([ CityOrderByWithRelationInputSchema.array(),CityOrderByWithRelationInputSchema ]).optional(),
  cursor: CityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CityScalarFieldEnumSchema,CityScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CityFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CityFindFirstOrThrowArgs> = z.object({
  select: CitySelectSchema.optional(),
  where: CityWhereInputSchema.optional(),
  orderBy: z.union([ CityOrderByWithRelationInputSchema.array(),CityOrderByWithRelationInputSchema ]).optional(),
  cursor: CityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CityScalarFieldEnumSchema,CityScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CityFindManyArgsSchema: z.ZodType<Prisma.CityFindManyArgs> = z.object({
  select: CitySelectSchema.optional(),
  where: CityWhereInputSchema.optional(),
  orderBy: z.union([ CityOrderByWithRelationInputSchema.array(),CityOrderByWithRelationInputSchema ]).optional(),
  cursor: CityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CityScalarFieldEnumSchema,CityScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CityAggregateArgsSchema: z.ZodType<Prisma.CityAggregateArgs> = z.object({
  where: CityWhereInputSchema.optional(),
  orderBy: z.union([ CityOrderByWithRelationInputSchema.array(),CityOrderByWithRelationInputSchema ]).optional(),
  cursor: CityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CityGroupByArgsSchema: z.ZodType<Prisma.CityGroupByArgs> = z.object({
  where: CityWhereInputSchema.optional(),
  orderBy: z.union([ CityOrderByWithAggregationInputSchema.array(),CityOrderByWithAggregationInputSchema ]).optional(),
  by: CityScalarFieldEnumSchema.array(),
  having: CityScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CityFindUniqueArgsSchema: z.ZodType<Prisma.CityFindUniqueArgs> = z.object({
  select: CitySelectSchema.optional(),
  where: CityWhereUniqueInputSchema,
}).strict() ;

export const CityFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CityFindUniqueOrThrowArgs> = z.object({
  select: CitySelectSchema.optional(),
  where: CityWhereUniqueInputSchema,
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

export const TagTranslationFindFirstArgsSchema: z.ZodType<Prisma.TagTranslationFindFirstArgs> = z.object({
  select: TagTranslationSelectSchema.optional(),
  include: TagTranslationIncludeSchema.optional(),
  where: TagTranslationWhereInputSchema.optional(),
  orderBy: z.union([ TagTranslationOrderByWithRelationInputSchema.array(),TagTranslationOrderByWithRelationInputSchema ]).optional(),
  cursor: TagTranslationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagTranslationScalarFieldEnumSchema,TagTranslationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TagTranslationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TagTranslationFindFirstOrThrowArgs> = z.object({
  select: TagTranslationSelectSchema.optional(),
  include: TagTranslationIncludeSchema.optional(),
  where: TagTranslationWhereInputSchema.optional(),
  orderBy: z.union([ TagTranslationOrderByWithRelationInputSchema.array(),TagTranslationOrderByWithRelationInputSchema ]).optional(),
  cursor: TagTranslationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagTranslationScalarFieldEnumSchema,TagTranslationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TagTranslationFindManyArgsSchema: z.ZodType<Prisma.TagTranslationFindManyArgs> = z.object({
  select: TagTranslationSelectSchema.optional(),
  include: TagTranslationIncludeSchema.optional(),
  where: TagTranslationWhereInputSchema.optional(),
  orderBy: z.union([ TagTranslationOrderByWithRelationInputSchema.array(),TagTranslationOrderByWithRelationInputSchema ]).optional(),
  cursor: TagTranslationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagTranslationScalarFieldEnumSchema,TagTranslationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TagTranslationAggregateArgsSchema: z.ZodType<Prisma.TagTranslationAggregateArgs> = z.object({
  where: TagTranslationWhereInputSchema.optional(),
  orderBy: z.union([ TagTranslationOrderByWithRelationInputSchema.array(),TagTranslationOrderByWithRelationInputSchema ]).optional(),
  cursor: TagTranslationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TagTranslationGroupByArgsSchema: z.ZodType<Prisma.TagTranslationGroupByArgs> = z.object({
  where: TagTranslationWhereInputSchema.optional(),
  orderBy: z.union([ TagTranslationOrderByWithAggregationInputSchema.array(),TagTranslationOrderByWithAggregationInputSchema ]).optional(),
  by: TagTranslationScalarFieldEnumSchema.array(),
  having: TagTranslationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TagTranslationFindUniqueArgsSchema: z.ZodType<Prisma.TagTranslationFindUniqueArgs> = z.object({
  select: TagTranslationSelectSchema.optional(),
  include: TagTranslationIncludeSchema.optional(),
  where: TagTranslationWhereUniqueInputSchema,
}).strict() ;

export const TagTranslationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TagTranslationFindUniqueOrThrowArgs> = z.object({
  select: TagTranslationSelectSchema.optional(),
  include: TagTranslationIncludeSchema.optional(),
  where: TagTranslationWhereUniqueInputSchema,
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

export const DatingPreferenceFindFirstArgsSchema: z.ZodType<Prisma.DatingPreferenceFindFirstArgs> = z.object({
  select: DatingPreferenceSelectSchema.optional(),
  where: DatingPreferenceWhereInputSchema.optional(),
  orderBy: z.union([ DatingPreferenceOrderByWithRelationInputSchema.array(),DatingPreferenceOrderByWithRelationInputSchema ]).optional(),
  cursor: DatingPreferenceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DatingPreferenceScalarFieldEnumSchema,DatingPreferenceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DatingPreferenceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DatingPreferenceFindFirstOrThrowArgs> = z.object({
  select: DatingPreferenceSelectSchema.optional(),
  where: DatingPreferenceWhereInputSchema.optional(),
  orderBy: z.union([ DatingPreferenceOrderByWithRelationInputSchema.array(),DatingPreferenceOrderByWithRelationInputSchema ]).optional(),
  cursor: DatingPreferenceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DatingPreferenceScalarFieldEnumSchema,DatingPreferenceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DatingPreferenceFindManyArgsSchema: z.ZodType<Prisma.DatingPreferenceFindManyArgs> = z.object({
  select: DatingPreferenceSelectSchema.optional(),
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
  where: DatingPreferenceWhereUniqueInputSchema,
}).strict() ;

export const DatingPreferenceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DatingPreferenceFindUniqueOrThrowArgs> = z.object({
  select: DatingPreferenceSelectSchema.optional(),
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

export const CityCreateArgsSchema: z.ZodType<Prisma.CityCreateArgs> = z.object({
  select: CitySelectSchema.optional(),
  data: z.union([ CityCreateInputSchema,CityUncheckedCreateInputSchema ]),
}).strict() ;

export const CityUpsertArgsSchema: z.ZodType<Prisma.CityUpsertArgs> = z.object({
  select: CitySelectSchema.optional(),
  where: CityWhereUniqueInputSchema,
  create: z.union([ CityCreateInputSchema,CityUncheckedCreateInputSchema ]),
  update: z.union([ CityUpdateInputSchema,CityUncheckedUpdateInputSchema ]),
}).strict() ;

export const CityCreateManyArgsSchema: z.ZodType<Prisma.CityCreateManyArgs> = z.object({
  data: z.union([ CityCreateManyInputSchema,CityCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CityCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CityCreateManyAndReturnArgs> = z.object({
  data: z.union([ CityCreateManyInputSchema,CityCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CityDeleteArgsSchema: z.ZodType<Prisma.CityDeleteArgs> = z.object({
  select: CitySelectSchema.optional(),
  where: CityWhereUniqueInputSchema,
}).strict() ;

export const CityUpdateArgsSchema: z.ZodType<Prisma.CityUpdateArgs> = z.object({
  select: CitySelectSchema.optional(),
  data: z.union([ CityUpdateInputSchema,CityUncheckedUpdateInputSchema ]),
  where: CityWhereUniqueInputSchema,
}).strict() ;

export const CityUpdateManyArgsSchema: z.ZodType<Prisma.CityUpdateManyArgs> = z.object({
  data: z.union([ CityUpdateManyMutationInputSchema,CityUncheckedUpdateManyInputSchema ]),
  where: CityWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CityUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CityUpdateManyAndReturnArgs> = z.object({
  data: z.union([ CityUpdateManyMutationInputSchema,CityUncheckedUpdateManyInputSchema ]),
  where: CityWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CityDeleteManyArgsSchema: z.ZodType<Prisma.CityDeleteManyArgs> = z.object({
  where: CityWhereInputSchema.optional(),
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

export const TagTranslationCreateArgsSchema: z.ZodType<Prisma.TagTranslationCreateArgs> = z.object({
  select: TagTranslationSelectSchema.optional(),
  include: TagTranslationIncludeSchema.optional(),
  data: z.union([ TagTranslationCreateInputSchema,TagTranslationUncheckedCreateInputSchema ]),
}).strict() ;

export const TagTranslationUpsertArgsSchema: z.ZodType<Prisma.TagTranslationUpsertArgs> = z.object({
  select: TagTranslationSelectSchema.optional(),
  include: TagTranslationIncludeSchema.optional(),
  where: TagTranslationWhereUniqueInputSchema,
  create: z.union([ TagTranslationCreateInputSchema,TagTranslationUncheckedCreateInputSchema ]),
  update: z.union([ TagTranslationUpdateInputSchema,TagTranslationUncheckedUpdateInputSchema ]),
}).strict() ;

export const TagTranslationCreateManyArgsSchema: z.ZodType<Prisma.TagTranslationCreateManyArgs> = z.object({
  data: z.union([ TagTranslationCreateManyInputSchema,TagTranslationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TagTranslationCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TagTranslationCreateManyAndReturnArgs> = z.object({
  data: z.union([ TagTranslationCreateManyInputSchema,TagTranslationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TagTranslationDeleteArgsSchema: z.ZodType<Prisma.TagTranslationDeleteArgs> = z.object({
  select: TagTranslationSelectSchema.optional(),
  include: TagTranslationIncludeSchema.optional(),
  where: TagTranslationWhereUniqueInputSchema,
}).strict() ;

export const TagTranslationUpdateArgsSchema: z.ZodType<Prisma.TagTranslationUpdateArgs> = z.object({
  select: TagTranslationSelectSchema.optional(),
  include: TagTranslationIncludeSchema.optional(),
  data: z.union([ TagTranslationUpdateInputSchema,TagTranslationUncheckedUpdateInputSchema ]),
  where: TagTranslationWhereUniqueInputSchema,
}).strict() ;

export const TagTranslationUpdateManyArgsSchema: z.ZodType<Prisma.TagTranslationUpdateManyArgs> = z.object({
  data: z.union([ TagTranslationUpdateManyMutationInputSchema,TagTranslationUncheckedUpdateManyInputSchema ]),
  where: TagTranslationWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TagTranslationUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.TagTranslationUpdateManyAndReturnArgs> = z.object({
  data: z.union([ TagTranslationUpdateManyMutationInputSchema,TagTranslationUncheckedUpdateManyInputSchema ]),
  where: TagTranslationWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TagTranslationDeleteManyArgsSchema: z.ZodType<Prisma.TagTranslationDeleteManyArgs> = z.object({
  where: TagTranslationWhereInputSchema.optional(),
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

export const DatingPreferenceCreateArgsSchema: z.ZodType<Prisma.DatingPreferenceCreateArgs> = z.object({
  select: DatingPreferenceSelectSchema.optional(),
  data: z.union([ DatingPreferenceCreateInputSchema,DatingPreferenceUncheckedCreateInputSchema ]),
}).strict() ;

export const DatingPreferenceUpsertArgsSchema: z.ZodType<Prisma.DatingPreferenceUpsertArgs> = z.object({
  select: DatingPreferenceSelectSchema.optional(),
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
  where: DatingPreferenceWhereUniqueInputSchema,
}).strict() ;

export const DatingPreferenceUpdateArgsSchema: z.ZodType<Prisma.DatingPreferenceUpdateArgs> = z.object({
  select: DatingPreferenceSelectSchema.optional(),
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
---
sidebar_position: 3
description: Configure SAML 2.0 Single Sign-On for Anaphora with Okta, Azure AD, OneLogin, and other identity providers.
keywords: [ SAML, SSO, Single Sign-On, Okta, Azure AD, OneLogin, identity provider, IdP ]
---

# SAML / Single Sign-On

Anaphora supports single sign-on through SAML 2.0 identity providers. Users log in through your corporate IdP, and Anaphora creates their accounts automatically.
![SAML single sign-on settings in Anaphora](images/saml.png)
## Overview

With SAML SSO, users have one login for all applications, and you manage them in your IdP. Anaphora creates each user
at the first login and maps IdP groups to Anaphora roles.

## Supported identity providers

| Provider | Status | Notes |
|----------|--------|-------|
| Okta | Tested | Full support |
| Azure AD | Tested | Full support |
| OneLogin | Tested | Full support |
| Google Workspace | Tested | SAML app required |
| PingFederate | Compatible | Standard SAML 2.0 |
| ADFS | Compatible | Standard SAML 2.0 |
| Keycloak | Compatible | Standard SAML 2.0 |
| Custom IdP | Compatible | Any SAML 2.0 compliant |

## Configuration steps

### Step 1: Collect the SP values

Your IdP needs these values. `<anaphora-external-url>` is the public URL of Anaphora (`NEXT_PUBLIC_SITE_URL`).

| Value                                         | URL or value                                           |
|-----------------------------------------------|--------------------------------------------------------|
| Assertion Consumer Service (ACS) URL          | `https://<anaphora-external-url>/auth/login-saml/callback` |
| Entity ID (SP identifier, Audience)           | The value of **Issuer** in Anaphora, for example `anaphora` |
| Single Logout URL                             | `https://<anaphora-external-url>/auth/logout-saml`      |

When SAML is active (see [Step 3](#step-3-enter-the-idp-values)), Anaphora also publishes these values as SP metadata:

```
https://<anaphora-external-url>/auth/saml/metadata.xml
```

The metadata names the entity (**Issuer**), the ACS URL and the **Logout callback URL**. Set **Decryption cert** (the
certificate of **Decryption PVK**) to publish the encryption key. Set `extraConfig.publicCert` (the certificate of
`extraConfig.privateKey`) to publish the signing key. If your IdP cannot read SP metadata, enter the values by hand.

### Step 2: Configure your IdP

Create a new SAML application in your identity provider.

#### Okta

1. Admin Console > Applications > Create App Integration
2. Select SAML 2.0
3. Enter these values by hand:
   - Single Sign On URL: `https://anaphora.company.com/auth/login-saml/callback`
   - Audience URI: the value of **Issuer** in Anaphora
4. Configure attribute statements (see below)
5. Assign users/groups

#### Azure AD

1. Azure Portal > Enterprise Applications > New Application
2. Create your own application > Non-gallery
3. Single sign-on > SAML
4. Enter:
   - Identifier: the value of **Issuer** in Anaphora
   - Reply URL: `https://anaphora.company.com/auth/login-saml/callback`
5. Configure claims mapping
6. Assign users/groups

#### OneLogin

1. Applications > Add App > SAML Custom Connector
2. Configuration tab:
   - ACS URL: `https://anaphora.company.com/auth/login-saml/callback`
   - Audience: the value of **Issuer** in Anaphora
3. Parameters tab: Add attribute mappings
4. Access tab: Assign roles

### Step 3: Enter the IdP values

Back in Anaphora:

1. Go to **Settings** > **System** > **Auth** > **SAML**
2. Fill in the fields:

| Field                  | Description                                                              | Required |
|------------------------|--------------------------------------------------------------------------|----------|
| Entry point            | IdP entry point URL, for example `https://keycloak.server/realms/yourRealm/protocol/saml` | Yes      |
| Issuer                 | Issuer string for the IdP. For Keycloak, this is the Client ID           | Yes      |
| Certificate            | IdP signing certificate (see below)                                      | Yes      |
| Logout callback URL    | Full logout callback URL, for example `https://anaphora.company.com/auth/logout-saml` | Yes      |
| Logout URL             | Where the logout request goes. Empty sends it to **Entry point**         | No       |
| Decryption PVK         | Private key to decrypt assertions (stored encrypted)                     | Yes      |
| Decryption cert        | Certificate of **Decryption PVK**, published in the SP metadata          | No       |
| Accepted clock skew ms | Allowed clock difference in milliseconds. Default: `0`. `-1` turns the time check off | No       |
| Username parameter     | SAML attribute for the username. Default: `nameID`                       | No       |
| Groups parameter       | SAML attribute for the groups/roles. Default: `Role`                     | No       |
| System groups          | Groups whose users get the system role (see [System groups](./index.md#system-groups)) | No       |
| Extra config           | YAML object with more SAML options (see below)                           | No       |

3. Click **Save**
4. To activate SAML, add `saml` to **Strategies** in **Settings** > **System** > **General**

### Signing certificate

The **Certificate** field holds the IdP signing certificate that validates SAML assertions. It is the X.509 certificate in the SAML metadata of your IdP, in `<ds:X509Certificate>`.

For Keycloak, the metadata URL is:
```
https://<keycloak-host>/realms/<your-realm>/protocol/saml/descriptor
```

The certificate is a long Base64-encoded string, for example:
```
MIICizCCAfQCCQCET8tKaMc0BMjANBgkqh...g=
```

:::tip
Anaphora does not read the IdP metadata. Copy the certificate from the metadata into **Certificate**.
:::

### Step 4: Map attributes

Configure how IdP claims map to the Anaphora user fields.

## Attribute mapping

### Required claims

| Anaphora Field | SAML Claim | Description |
|----------------|------------|-------------|
| Username | `nameID` (set in **Username parameter**) | Unique user identifier |

An assertion without the attribute in **Username parameter** is refused.

### Optional claims

| Anaphora Field | SAML Claim | Description |
|----------------|------------|-------------|
| Groups | `Role` (set in **Groups parameter**) | For role mapping |

Anaphora reads no other attributes.

### Okta attribute statements

```
Name: email
Value: user.email

Name: firstName
Value: user.firstName

Name: lastName
Value: user.lastName

Name: groups
Value: (Group membership attribute)
```

Set **Groups parameter** to the attribute name, in this example `groups`.

### Azure AD claims

```
Claim name: email
Source attribute: user.mail

Claim name: displayName
Source attribute: user.displayname

Claim name: groups
Source attribute: user.groups
```

## Group-based roles

Map IdP groups to Anaphora roles to assign permissions automatically.

### Groups attribute configuration

The **Groups parameter** setting is the SAML attribute that contains the group or role information. Default: `Role`

Every value counts. The IdP can send one attribute with several values, or one attribute per value (in Keycloak,
**Single Role Attribute** on or off). A user with one group gets that role.

### Role mapping

Each IdP group becomes an Anaphora role with the same name.

1. Go to **Settings** > **System** > **Permissions**
2. In a space, add a permission for the role, and set its access:

| IdP Group | Access |
|-----------|--------|
| `Anaphora-Admins` | Admin |
| `Anaphora-Editors` | Read Write |
| `Anaphora-Viewers` | Read Only |

A user in one of the **System groups** gets the system role: the **Settings** menu and Admin access to every space.
See [System groups](./index.md#system-groups).

### Space mapping

Give each group access to one or more spaces:

| IdP Group | Space | Access |
|-----------|-------|--------|
| `Team-Alpha` | Alpha Reports | Read Write |
| `Team-Beta` | Beta Reports | Read Write |
| `All-Staff` | Company Dashboards | Read Only |

## Advanced settings

### SAML configuration options

Anaphora sets these node-saml options. Change them in **Extra config**.

| Option | Description | Default |
|--------|-------------|---------|
| `wantAssertionsSigned` | Require the IdP to sign assertions | `false` |
| `wantAuthnResponseSigned` | Require the IdP to sign the response | `false` |
| `audience` | Expected audience of the assertion. `false` turns the check off | The value of **Issuer** |
| `validateInResponseTo` | `always`: a response must answer a login that Anaphora started, once, within 15 minutes. `never` accepts a login that starts at the IdP portal | `always` |

**Extra config** cannot change a setting that has a field of its own, for example `issuer`, `entryPoint` or
`acceptedClockSkewMs`.

### Checks on every assertion

- The Audience must be the value of **Issuer**. Set `audience` in **Extra config** to the value that your IdP sends, or
  to `false` to turn the check off.
- NotBefore and NotOnOrAfter must hold within **Accepted clock skew ms**.
- The response must answer a login that Anaphora started (`InResponseTo`). A login that starts at the portal of the
  IdP is refused. Set `validateInResponseTo: never` in **Extra config** to accept it. The start log then warns, because
  a captured response can then log in.

### Logout

When a user logs out of Anaphora, Anaphora sends the IdP a LogoutRequest with the NameID and the SessionIndex of the
login, so the IdP ends its session too. The request goes to **Logout URL**, or to **Entry point** when **Logout URL** is
empty.

A logout that the IdP starts must be signed with the key of **Certificate**. A signed LogoutRequest ends the sessions
that it names, in every browser. An unsigned one ends nothing. In Keycloak, turn on **Sign documents** in the SAML
settings of the client.

### Extra configuration

The **Extra config** field accepts a YAML object with more SAML strategy options. Use it to override or extend the default SAML configuration.

```yaml
wantAssertionsSigned: true
allowCreate: true
```

Common options:

| Option | Description |
|--------|-------------|
| `wantAssertionsSigned` | Require signed assertions |
| `allowCreate` | Allow IdP to create new identifiers |
| `forceAuthn` | Force re-authentication on each request |
| `passReqToCallback` | Pass request to verify callback |
| `disableRequestedAuthnContext` | Skip authentication context |

See the full list of available options in the [node-saml documentation](https://github.com/node-saml/node-saml/blob/4.x/README.md#config-parameter-details).

:::caution
Use extra configuration options with caution. Incorrect settings may break SAML authentication.
:::

### Session settings

| Setting | Where | Description |
|---------|-------|-------------|
| **Max age hours** | **Settings** > **System** > **Backend** | How long an Anaphora session lasts. Default: `60` |
| **Logout callback URL** | **Settings** > **System** > **Auth** > **SAML** | Where the IdP sends the SAML logout |
| `forceAuthn` | **Extra config** | Require a new IdP login each time |

## Testing

### Test SAML configuration

1. Log out, then click **Continue with SAML** on the login page
2. Anaphora sends you to your IdP
3. Log in with IdP credentials
4. Make sure that the IdP sends you back to Anaphora
5. Make sure that the user gets the correct spaces

### Debug SAML

Use a more detailed log level:

1. Go to **Settings** > **System** > **General**
2. Set **Log level** to `debug` or `trace`
3. Try to log in
4. Read the Anaphora log

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Redirect loop | Check that the ACS URL is exactly the same in both systems |
| Invalid signature | Make sure the IdP certificate in Anaphora is current |
| User has no username | Check **Username parameter**, make sure the IdP sends that attribute. An assertion without it is refused |
| Groups not mapped | Make sure the IdP sends the attribute in **Groups parameter**, check group name format |
| "SAML assertion not yet valid" or another clock skew error | Make sure server clocks are synchronized (NTP), or set **Accepted clock skew ms** |
| "SAML assertion audience mismatch" or "SAML assertion has no AudienceRestriction" | Set `audience` in **Extra config** to the value that the IdP sends |
| Login from the IdP portal fails | Set `validateInResponseTo: never` in **Extra config** |
| Logout at the IdP leaves the Anaphora session open | Make the IdP sign its LogoutRequest |

When the sign-in at the IdP fails, the browser goes back to the Anaphora login page, which shows the reason.

### Common errors

**"SAML Response validation failed"**
- Certificate mismatch: copy the current certificate from the IdP metadata into **Certificate**
- Clock skew: check server time synchronization

**"NameID not found"**
- The IdP does not send NameID
- Check IdP configuration for NameID format

## Best practices

- Update **Certificate** when the IdP rotates its signing certificate
- Set `wantAssertionsSigned: true` in **Extra config** for security
- Map groups to roles instead of individual users
- Test fully before you enable SAML for all users

## Next steps

- [OIDC](./oidc): OpenID Connect, an alternative to SAML
- [Spaces](../spaces): configure space-based access

import {initializeApp, cert} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

initializeApp({
    credential: cert({
        type: "service_account",
        project_id: "hnect-staff-locator-storage",
        private_key_id: "b3a9397738963c128708614b64d29bd8007861b6",
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCVo8ebvv9Ap5X6\nCBk3cfC1yHvxUG5Cptn2YvL5MVj32tp6lGEqUsijIBCz9HDDnE65HyZp+IYZXJYg\nUwkeNJ7Q7q6HZNzpbCkLqbRckeQlvfM7mOgmTMLnzlQvHiTShiDXLiZSnOuu1SpX\nWTA2f38FHKkieUFRTRYcpGjqmU5oi9yzij6B+aRritgd7VOs6V+QzIIMkurh9iDH\n+URgnCmSHI15sRHLIt3PT+k+tmHMELtZ7ZzWpmtaWzkgQ6jFPpbD0IC00kjzE1Kx\nvSlSaOSBdMQHXBTAs6JHmIWrdMKBcb1d/gRiIVhVLVr7bXA4tJth8U1v0UcIhsx4\n3PtSrsFlAgMBAAECggEAAds+wQ5xGIjLtuBuJNtl9vD5cRCEO0SNjGQE+CiPnj/2\nktIJVFu9D5SfAgbsqQL+kTp5ja1OrcnE6gc/SnYXXBrniuUqZKUmuDVfHoCuPo9s\nXe2ppnBjpznba2jTRtJXqqiKdkVqNII1mYPqsdswkZKd5yaic9zOz950figwCkkT\n2BVNnat04D89rsierczJQ7vHSAG0iWRARK2YWXnA5CyYDDJEQ3dL7NV46mLYf0NJ\niHZYaEIO5DXvUZJGchXnuTUvZsDx2Y5148MAGXt3PxjPXP5389xjI90NVaxD8DgR\nZcFCva3XNFCpyyeJWDn1JdmHgBzdeVA3a7F+ddsREQKBgQDShYe/VFOBZzt9jj0O\nT5gXcN7MHBUnjwxZQ2ACnEUGms0fGYAA8nu0CcIi6yQot9FWORpXKKqUQVwXTz5e\nTtNaeevuHv/jw8xjCoVB+wJHV8LGLq4pGJK4/PAUnqjj8NMAMPcWqI9A1AWJoo2F\noM5AeevrVh9s690579v7UB+kVQKBgQC1902TivOoWENZGuumel/rF44tJss0sQur\n3R5PRKF0ca/N2HMK2oXypSu99tMTDn2U+NAaBc9luZmwgsNib6IhEImnHizCkqkc\no+ZRpRaxQ06yMvjoCtNoQp2cYhPD1oCJ0Hxr3M9Kcppw8jAo4pW1+nanyEAUhqYJ\nA+wPeEs40QKBgQCvAB9jFidAh981NRteHR4yRjp+881GECzUuyRBp0PeBKsE8j6t\nCuV4OTBvtIZfbsaO5XMXBxAdo+N44P/Yh7A8IuPUE2LmJGpv3lv+CDnRsouQEVfn\ng6zcKC8vBOEicpwEKbAM3twOqPFdg4ofjhhGEtPh0rrW4Y8KTXDRjb5v7QKBgGzc\nGS3mV+RjgU8CWu4Kke2L9wOuDK1mKYxUyXg0n76Q8NLd5d0dZDsIc0W/LwFcjuab\nf6vBxBSgV4CQiiEOldjgEunGlJKGuOMobnZzpELB+IeFFQGE0Hq0N6RBzH9BiT5p\nWrYQsHZiX2CokwUyoMvwniG8HBHrh9Mm5IdQuPexAoGAUyIAEKw2HpWwQ2OIDjPj\nJRP9ykQ0vO5r+b84ic20QVqugFI02uY9UkwxNKogRr7NCW0C37zgb/se23JTYpbh\nEwKsGOQMCXeNF28Qeb3Xm3K4anm3L5pLzJHbcNwU9Na8o9kaoiizU9Av7HJ5kpee\nq1JdBVbezCilwCgKx9hJZ54=\n-----END PRIVATE KEY-----\n",
        client_email: "firebase-adminsdk-xvvt7@hnect-staff-locator-storage.iam.gserviceaccount.com",
        client_id: "107247243089868785947",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xvvt7%40hnect-staff-locator-storage.iam.gserviceaccount.com"
    })
});

export const db = getFirestore();


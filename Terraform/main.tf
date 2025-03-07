terraform {
  required_providers {
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 5.0"
    }
    local = {
      source  = "hashicorp/local"
      version = "~> 2.0"
    }
  }
}

provider "google-beta" {
  user_project_override = false
  region                = "asia-northeast1"
}

# Firebase プロジェクト用の GCP プロジェクトを立ち上げる
resource "google_project" "default" {
  provider = google-beta

  # project_id は全世界で一意になる必要がある。
  # 今回は、各自で適当にidを変更すること。しかし、大文字は使えない。
  project_id      = "c4s-cloudff-sandbox-20250304"
  # これはなんでもいい。
  name            = "C4s-CloudF-sandbox"

  # Firebase のプロジェクトとして表示するために必要
  labels = {
    "firebase" = "enabled"
  }
}

# 各APIの有効化
resource "google_project_service" "default" {
  provider = google-beta
  project = google_project.default.project_id
  for_each = toset([
    "serviceusage.googleapis.com",
    "firebase.googleapis.com",
    "identitytoolkit.googleapis.com",
    "firestore.googleapis.com",
    "firebaserules.googleapis.com",
    "firebasestorage.googleapis.com",
    "storage.googleapis.com",
    "firebasehosting.googleapis.com",
  ])
  service = each.key
  disable_on_destroy = false
}

# Firebase のプロジェクトを立ち上げる
resource "google_firebase_project" "default" {
  provider = google-beta
  project  = google_project.default.project_id

  depends_on = [
    google_project_service.default,
  ]
}

# Firebase Webアプリの作成
resource "google_firebase_web_app" "default" {
  provider     = google-beta
  project      = google_project.default.project_id
  display_name = "C4s-CloudF-sandbox Web App"
  depends_on   = [google_firebase_project.default]
}

# Firebase Web SDKの設定ファイルを取得
resource "google_firebase_web_app_config" "default" {
  provider   = google-beta
  project    = google_project.default.project_id
  web_app_id = google_firebase_web_app.default.app_id
}

output "firebase_config" {
  value = {
    api_key            = google_firebase_web_app.default.api_key
    auth_domain        = "${google_project.default.project_id}.firebaseapp.com"
    database_url       = "https://${google_project.default.project_id}-default-rtdb.asia-southeast1.firebasedatabase.app"
    project_id         = google_project.default.project_id
    storage_bucket     = "${google_project.default.project_id}.appspot.com"
    messaging_sender_id = google_firebase_web_app.default.messaging_sender_id
    app_id             = google_firebase_web_app.default.app_id
  }
  sensitive = true
}

# Firebase Web SDKの設定ファイルを取得
resource "google_firebase_web_app_config" "default" {
  provider   = google-beta
  project    = google_project.default.project_id
  web_app_id = google_firebase_web_app.default.app_id
}

# 環境変数ファイル用の変数を設定
locals {
  env_content = <<-EOT
    FIREBASE_API_KEY=${google_firebase_web_app_config.default.api_key}
    FIREBASE_AUTH_DOMAIN=${google_project.default.project_id}.firebaseapp.com
    FIREBASE_DATABASE_URL=https://${google_project.default.project_id}-default-rtdb.asia-southeast1.firebasedatabase.app
    FIREBASE_PROJECT_ID=${google_project.default.project_id}
    FIREBASE_STORAGE_BUCKET=${google_project.default.project_id}.appspot.com
    FIREBASE_MESSAGING_SENDER_ID=${google_firebase_web_app_config.default.messaging_sender_id}
    FIREBASE_APP_ID=${google_firebase_web_app.default.app_id}
  EOT

  google_services_json = jsonencode({
    "apiKey"            = google_firebase_web_app_config.default.api_key
    "authDomain"        = "${google_project.default.project_id}.firebaseapp.com"
    "databaseURL"       = "https://${google_project.default.project_id}-default-rtdb.asia-southeast1.firebasedatabase.app"
    "projectId"         = google_project.default.project_id
    "storageBucket"     = "${google_project.default.project_id}.appspot.com"
    "messagingSenderId" = google_firebase_web_app_config.default.messaging_sender_id
    "appId"             = google_firebase_web_app.default.app_id
  })
}

# .envファイルを自動生成
resource "local_file" "env_file" {
  content  = local.env_content
  filename = "${path.module}/.env"
  
  depends_on = [
    google_firebase_web_app_config.default
  ]
}

# google-services.jsonファイル自動生成
resource "local_file" "google_services_json" {
  content  = local.google_services_json
  filename = "${path.module}/google-services.json"
  
  depends_on = [
    google_firebase_web_app_config.default
  ]
}

# Firebase Webアプリの作成
resource "google_firebase_web_app" "default" {
  provider     = google-beta
  project      = google_project.default.project_id
  display_name = "C4s-CloudF-sandbox Web App"
  depends_on   = [google_firebase_project.default]
}